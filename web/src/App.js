import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import Card from './components/Card';
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';

import * as THREE from "three";
import { useRef } from "react";

import { gsap } from 'gsap';

const stateMap = {"01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY"};

const stateCoordinates = {
  WI: { lat: 44.500000, lng: -89.500000 }, // Wisconsin
  WV: { lat: 39.000000, lng: -80.500000 }, // West Virginia
  VT: { lat: 44.000000, lng: -72.699997 }, // Vermont
  TX: { lat: 31.000000, lng: -100.000000 }, // Texas
  SD: { lat: 44.500000, lng: -100.000000 }, // South Dakota
  RI: { lat: 41.742325, lng: -71.742332 }, // Rhode Island
  OR: { lat: 44.000000, lng: -120.500000 }, // Oregon
  NY: { lat: 43.000000, lng: -75.000000 }, // New York
  NH: { lat: 44.000000, lng: -71.500000 }, // New Hampshire
  NE: { lat: 41.500000, lng: -100.000000 }, // Nebraska
  KS: { lat: 38.500000, lng: -98.000000 }, // Kansas
  MS: { lat: 33.000000, lng: -90.000000 }, // Mississippi
  IL: { lat: 40.000000, lng: -89.000000 }, // Illinois
  DE: { lat: 39.000000, lng: -75.500000 }, // Delaware
  CT: { lat: 41.599998, lng: -72.699997 }, // Connecticut
  AR: { lat: 34.799999, lng: -92.199997 }, // Arkansas
  IN: { lat: 40.273502, lng: -86.126976 }, // Indiana
  MO: { lat: 38.573936, lng: -92.603760 }, // Missouri
  FL: { lat: 27.994402, lng: -81.760254 }, // Florida
  NV: { lat: 39.876019, lng: -117.224121 }, // Nevada
  ME: { lat: 45.367584, lng: -68.972168 }, // Maine
  MI: { lat: 44.182205, lng: -84.506836 }, // Michigan
  GA: { lat: 33.247875, lng: -83.441162 }, // Georgia
  HI: { lat: 19.741755, lng: -155.844437 }, // Hawaii
  AK: { lat: 66.160507, lng: -153.369141 }, // Alaska
  TN: { lat: 35.860119, lng: -86.660156 }, // Tennessee
  VA: { lat: 37.926868, lng: -78.024902 }, // Virginia
  NJ: { lat: 39.833851, lng: -74.871826 }, // New Jersey
  KY: { lat: 37.839333, lng: -84.270020 }, // Kentucky
  ND: { lat: 47.650589, lng: -100.437012 }, // North Dakota
  MN: { lat: 46.392410, lng: -94.636230 }, // Minnesota
  OK: { lat: 36.084621, lng: -96.921387 }, // Oklahoma
  MT: { lat: 46.965260, lng: -109.533691 }, // Montana
  WA: { lat: 47.751076, lng: -120.740135 }, // Washington
  UT: { lat: 39.419220, lng: -111.950684 }, // Utah
  CO: { lat: 39.113014, lng: -105.358887 }, // Colorado
  OH: { lat: 40.367474, lng: -82.996216 }, // Ohio
  AL: { lat: 32.318230, lng: -86.902298 }, // Alabama
  IA: { lat: 42.032974, lng: -93.581543 }, // Iowa
  NM: { lat: 34.307144, lng: -106.018066 }, // New Mexico
  SC: { lat: 33.836082, lng: -81.163727 }, // South Carolina
  PA: { lat: 41.203323, lng: -77.194527 }, // Pennsylvania
  AZ: { lat: 34.048927, lng: -111.093735 }, // Arizona
  MD: { lat: 39.045753, lng: -76.641273 }, // Maryland
  MA: { lat: 42.407211, lng: -71.382439 }, // Massachusetts
  CA: { lat: 36.778259, lng: -119.417931 }, // California
  ID: { lat: 44.068203, lng: -114.742043 }, // Idaho
  WY: { lat: 43.075970, lng: -107.290283 }, // Wyoming
  NC: { lat: 35.782169, lng: -80.793457 }, // North Carolina
  LA: { lat: 30.391830, lng: -92.329102 }, // Louisiana
};


function App() {
  const globeRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [displayedCounties, setDisplayedCounties] = useState({ features: []});
  const [emergencies, setEmergencies] = useState([]);
  const [disasterSet, setDisasterSet] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null); // Added state

  function handleMenuItemSelect(item) {
    setSelectedItem(item);
  }
  
  
  const [cameraPosition, setCameraPosition] = useState({ lat: 30, lng: -90, altitude: 1.8 });


  function handleGlobeClick(e) {
    console.log(e);
  }

  const zoomToLocation = (targetLat, targetLng) => {
    const currentPosition = {
      lat: globeRef.current.pointOfView().lat,
      lng: globeRef.current.pointOfView().lng,
      altitude: globeRef.current.pointOfView().altitude,
  };

  // Animate to the new camera position
  gsap.to(currentPosition, {
      lat: targetLat,
      lng: targetLng,
      altitude: .2, // Adjust altitude as needed
      duration: 1, // Duration of the animation
      onUpdate: () => {
          // Apply the animated position back to the globe
          globeRef.current.pointOfView({
              lat: currentPosition.lat,
              lng: currentPosition.lng,
              altitude: currentPosition.altitude,
          });

          // Log for debugging
          console.log("Camera position updated:", globeRef.current.pointOfView());
      },
  });
};

  function handleCountyClick(e) {
    console.log(e);
    const state = stateMap[e.properties.STATEFP];
    const county = e.properties.NAME;

    console.log(stateCoordinates[state].lat, stateCoordinates[state].lng); 
    zoomToLocation(stateCoordinates[state].lat, stateCoordinates[state].lng);

    // globeRef.current.pointOfView({
    //   lat: stateCoordinates[state].lat,
    //   lng: stateCoordinates[state].lng,
    //   altitude: 1,
    // });
    const newCameraPosition = { lat: stateCoordinates[state].lat, lng: stateCoordinates[state].lng, altitude: 1.5 };

    console.log(newCameraPosition);
    
    
    const matchingEmergencies = emergencies.filter(emergency => {
      return emergency.state.trim() === state && extractCounty(emergency.designatedArea) === county;
    });

    console.log("Matching Emergencies:", matchingEmergencies);

    
  }

  
  function handleZoom(e) {
    console.log(e);
  }
  
  function getDateKWeeksInThePast(k = 1) {
    const now = new Date();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const pastDate = new Date(now.getTime() - (oneWeekInMilliseconds * k));
    return pastDate.toISOString();
  }

  function extractCounty(county) {
    const index = county.indexOf('(');
    if (index !== -1) {
      return county.substring(0, index).trim();
    }
    return county.trim();
  }

  function getActiveAlerts() {
    let countyToZonesData = null;
    let zoneToCountyData = null;
  
    // Fetch county_to_zones.json
    fetch('./county_to_zones.json')
      .then(response => response.json())
      .then(data => {
        countyToZonesData = data;
        console.log('county_to_zones.json:', countyToZonesData);
      })
      .catch(error => console.error('Error fetching county_to_zones.json:', error));
  
    // Fetch zone_to_county.json
    fetch('./zone_to_county.json')
      .then(response => response.json())
      .then(data => {
        zoneToCountyData = data;
        console.log('zone_to_county.json:', zoneToCountyData);
      })
      .catch(error => console.error('Error fetching zone_to_county.json:', error));

    axios.get("https://api.weather.gov/alerts/active")
      .then((res) => {
        console.log(res.data.features);

        // Create a set of all active zones and a mapping of UGC codes to features
        const ugcSet = new Set();
        const ugcToFeatureMap = {};

        res.data.features.forEach(feature => {
          const ugcCodes = feature.properties.geocode.UGC;
          ugcCodes.forEach(code => {
            const modifiedCode = code.slice(0, 2) + code.slice(3);
            ugcSet.add(modifiedCode);

            if (!ugcToFeatureMap[modifiedCode]) {
              ugcToFeatureMap[modifiedCode] = [];
            }
            ugcToFeatureMap[modifiedCode].push(feature);
          });
        });

        console.log("UGC Set:", ugcSet);
        console.log("UGC to Feature Map:", ugcToFeatureMap);

        const countySet = new Set();

        ugcSet.forEach(ugcCode => {
          if (zoneToCountyData && zoneToCountyData[ugcCode]) {
            countySet.add(zoneToCountyData[ugcCode]);
          }
        });

        console.log("County Set:", countySet);

        // Fetch all zones
        fetch(`./counties.geojson?timestamp=${new Date().getTime()}`)
          .then(res => res.json())
          .then(data => {
            var filtered_counties = [];

            for (let i = 0; i < data.features.length; i++) {
              const feature = data.features[i];
              const state = stateMap[feature.properties.STATEFP];
              const county = feature.properties.NAME;
                if (countySet.has(`${state}-${county}`)) {
                  filtered_counties.push(feature);
                }
            }
            console.log("filtered", filtered_counties)
            setDisplayedCounties({ features: filtered_counties });
          })
          .catch((err) => console.error("Error fetching data:", err));
      })
  }

  function updateImpactedCounties(k = 4) {
    // Get the date one week ago
    const filter_date = getDateKWeeksInThePast(k)
    console.log(filter_date);
  
    // Load affected counties
    axios.get(`https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=incidentBeginDate%20gt%20'${filter_date}'&$allrecords=true`)
      .then((affected_counties) => { 

        const declaredEmergencies = affected_counties.data.DisasterDeclarationsSummaries;
        setEmergencies(declaredEmergencies);

        // console.log("emergencies", declaredEmergencies);

        // Create a set of state-county pairs for efficient filtering
        const disasterSet = new Set();
        for (let i = 0; i < declaredEmergencies.length; i++) {
          const emergency = declaredEmergencies[i];
          const stateCode = emergency.state.trim();
          var county = extractCounty(emergency.designatedArea);
          disasterSet.add(`${stateCode}-${county}`);
        }

        // console.log("Set", disasterSet);

        // Load all county data
        fetch('./counties.geojson')
          .then(res => res.json())
          .then((all_counties) => {
          // console.log("newcounties", all_counties)
          
          const filteredCounties = all_counties.features.filter(county => {
            const state = stateMap[county.properties.STATEFP];
            const name = county.properties.NAME.trim();
            return disasterSet.has(`${state}-${name}`);
          });
  
          // console.log("filter", filteredCounties)
  
          setDisplayedCounties({ features: filteredCounties });
        });
      })
      .catch((err) => console.error("Error fetching data:", err));
  }

  useEffect(() => {
    // load data
    axios.get('https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations')
      .then((res) => {
        const { features } = res.data; 
        setMarkers(features);
      })
      .catch((err) => console.error("Error fetching data:", err));
      
    // Load the affected counties and filter them on the globe
    updateImpactedCounties()
  }, []); 


  useEffect(() => {
    if (globeRef.current) {
        const scene = globeRef.current.scene();

        // Create the sunlight
        const sunlight = new THREE.DirectionalLight(0xffffff, 3);
        sunlight.position.set(50, 50, 50); 
        scene.add(sunlight);
    }
}, []);

  const globeReady = () => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.controls().enableZoom = true;
 
      globeRef.current.pointOfView({
        lat: 30.054339351561637,
        lng: -90.421161072148465,
        altitude: 1.8,
      });
    }
  };


  return (
    <div className="relative h-screen w-screen">
      {/* Navbar */}
      <Navbar onMenuItemSelect={handleMenuItemSelect} />

      {/* Cards with Animations */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Left Card */}
            <motion.div
              key="left-card"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-4 top-28 z-20 ml-20 w-fit"
            >
              <Card title={selectedItem} position="left" onClose={() => setSelectedItem(null)} />
            </motion.div>

            {/* Right Card */}
            <motion.div
              key="right-card"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute right-4 top-28 z-20 mr-20"
            >
              <Card title={selectedItem} position="right" onClose={() => setSelectedItem(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Globe */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Globe
            // initial load
            ref={globeRef}
            onGlobeReady={globeReady}
            camera={{
              lat: cameraPosition.lat,
              lng: cameraPosition.lng,
              altitude: cameraPosition.altitude,
            }}
            globeImageUrl="./earth.jpg"
            polygonsData={displayedCounties.features}
            polygonStrokeColor={() => '#000000'}
            polygonCapColor={() => 'rgba(255, 255, 255, 1)'}
            polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
            onPolygonClick={handleCountyClick}
            hexPolygonLabel={({ properties: d }) => `
            {console.log(d)}
              <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
              Population: <i>${d.POP_EST}</i>
            `}

            // stars in atmosphere?
            customLayerData={[...Array(500).keys()].map(() => ({
              lat: (Math.random() - 1) * 360,
              lng: (Math.random() - 1) * 360,
              altitude: Math.random() * 2,
              size: Math.random() * 0.4,
              color: '#ffffff',
            }))}
            customThreeObject={(sliceData) => {
              const { size, color } = sliceData;
              return new THREE.Mesh(new THREE.SphereGeometry(size), new THREE.MeshBasicMaterial({ color }));
            }}
            customThreeObjectUpdate={(obj, sliceData) => {
              const { lat, lng, altitude } = sliceData;
              return Object.assign(obj.position, globeRef.current?.getCoords(lat, lng, altitude));
            }}
            />
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
