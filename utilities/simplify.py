import json
from shapely.geometry import shape, mapping

def simplify_geojson(input_file, output_file, tolerance=0.0001):
    # Read the GeoJSON file
    with open(input_file, 'r') as f:
        geojson = json.load(f)
    
    # Create a new feature collection for simplified features
    simplified_features = []
    
    # Process each feature
    max_areas = []
    for feature in geojson['features']:
        # Convert the geometry to a shapely geometry
        geom = shape(feature['geometry'])
        
        # Simplify the geometry
        simplified_geom = geom.simplify(tolerance, preserve_topology=True)

        # Calculate the area of the simplified geometry
        area = simplified_geom.area
        max_areas.append(area)
        
        # Keep only the top 10 largest areas
        max_areas = sorted(max_areas, reverse=True)[:25]

        if not simplified_geom.is_valid:
            print("INVALID")
            continue
        
        # Create a new feature with simplified geometry
        simplified_feature = {
            'type': 'Feature',
            'geometry': mapping(simplified_geom),
            'properties': feature['properties']
        }
        
        simplified_features.append(simplified_feature)
    print("top areas", max_areas)
    
    # Create the simplified GeoJSON structure
    simplified_geojson = {
        'type': 'FeatureCollection',
        'features': simplified_features
    }
    
    # Write the simplified GeoJSON to a new file
    with open(output_file, 'w') as f:
        json.dump(simplified_geojson, f)

# Use the function
input_file = 'forecast_zones.geojson'
output_file = 'forecast_zones_simplified.geojson'
simplify_geojson(input_file, output_file, tolerance=0.01)