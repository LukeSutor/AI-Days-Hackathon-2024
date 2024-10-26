import json

# Initialize two dictionaries for our mappings
zone_to_county = {}
county_to_zone = {}

# Read the list of counties from counties.txt
with open('counties.txt', 'r') as counties_file:
    counties = [line.strip() for line in counties_file]

# Read the file and process each line
with open('map.txt', 'r') as file:
    for line in file:
        # Split the line by '|'
        parts = line.strip().split('|')
        
        # Create the zone code (e.g., "AL032")
        zone = parts[0] + parts[1]
        raw_county = parts[3]
        
        # Find the largest match in counties.txt
        county = max((c for c in counties if c in raw_county), key=len, default=raw_county)
        
        # Format the county name as "StateCode-CountyName"
        formatted_county = f"{parts[0]}-{county}"
        
        # Add to both mappings
        zone_to_county[zone] = formatted_county
        county_to_zone[formatted_county] = zone

# Write the mappings to JSON files
with open('zone_to_county.json', 'w') as f:
    json.dump(zone_to_county, f, indent=2)

with open('county_to_zone.json', 'w') as f:
    json.dump(county_to_zone, f, indent=2)

# Print the results
print("Zone to County mapping:")
print(json.dumps(zone_to_county, indent=2))
print("\nCounty to Zone mapping:")
print(json.dumps(county_to_zone, indent=2))