import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import * as THREE from "three";
import { useRef } from "react";

const stateMap = {"01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY"};

function App() {
  const [markers, setMarkers] = useState([]);
  const [displayedCounties, setDisplayedCounties] = useState({ features: []});
  const [emergencies, setEmergencies] = useState([]);
  const [disasterSet, setDisasterSet] = useState(new Set());
  
  function handleGlobeClick(e) {
    console.log(e);
  }

  function handleCountyClick(e) {
    console.log(e);
    const state = stateMap[e.properties.STATEFP];
    const county = e.properties.NAME;

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
    const worker = new Worker(new URL('./workers/fetchWorker.js', import.meta.url));
    getActiveAlerts();

    // Use absolute URL to fetch the file from the public directory
    // worker.postMessage({ url: `${window.location.origin}/forecast_zones.geojson?timestamp=${new Date().getTime()}` });

    worker.onmessage = function(event) {
      const { data, error } = event.data;

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const subset = data.features;
      setDisplayedCounties({ features: subset });
    };

    return () => worker.terminate();
    // // updateImpactedCounties();
    // fetch(`./forecast_zones.geojson?timestamp=${new Date().getTime()}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     const subset = data.features.slice(0, 10);
    //     setDisplayedCounties({ features: subset });
    //   })
    //   .catch((err) => console.error("Error fetching data:", err));
    // // fetch('./zones.geojson').then(res => res.json()).then(setDisplayedCounties);
    // // updateImpactedCounties()
  }, []);

  const globeRef = useRef(null);
 
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
    <div>
      <div className="flex flex-row h-full">
        <Globe
            // initial load
            ref={globeRef}
            onGlobeReady={globeReady}

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
