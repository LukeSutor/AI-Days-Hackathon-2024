// App.js
import React, { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import Card from './components/Card';
import CountyCard from "./components/CountyCard";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { FontLoader, TextGeometry } from 'three-stdlib';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Legend from "./components/Legend";

const stateMap = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
  "09": "CT", "10": "DE", "12": "FL", "13": "GA", "15": "HI", "16": "ID",
  "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA",
  "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ",
  "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK",
  "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN",
  "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV",
  "55": "WI", "56": "WY"
};

const stateCoordinates = {
  WI: { lat: 44.500000, lng: -89.500000 }, WV: { lat: 39.000000, lng: -80.500000 },
  VT: { lat: 44.000000, lng: -72.699997 }, TX: { lat: 31.000000, lng: -100.000000 },
  SD: { lat: 44.500000, lng: -100.000000 }, RI: { lat: 41.742325, lng: -71.742332 },
  OR: { lat: 44.000000, lng: -120.500000 }, NY: { lat: 43.000000, lng: -75.000000 },
  NH: { lat: 44.000000, lng: -71.500000 }, NE: { lat: 41.500000, lng: -100.000000 },
  KS: { lat: 38.500000, lng: -98.000000 }, MS: { lat: 33.000000, lng: -90.000000 },
  IL: { lat: 40.000000, lng: -89.000000 }, DE: { lat: 39.000000, lng: -75.500000 },
  CT: { lat: 41.599998, lng: -72.699997 }, AR: { lat: 34.799999, lng: -92.199997 },
  IN: { lat: 40.273502, lng: -86.126976 }, MO: { lat: 38.573936, lng: -92.603760 },
  FL: { lat: 27.994402, lng: -81.760254 }, NV: { lat: 39.876019, lng: -117.224121 },
  ME: { lat: 45.367584, lng: -68.972168 }, MI: { lat: 44.182205, lng: -84.506836 },
  GA: { lat: 33.247875, lng: -83.441162 }, HI: { lat: 19.741755, lng: -155.844437 },
  AK: { lat: 66.160507, lng: -153.369141 }, TN: { lat: 35.860119, lng: -86.660156 },
  VA: { lat: 37.926868, lng: -78.024902 }, NJ: { lat: 39.833851, lng: -74.871826 },
  KY: { lat: 37.839333, lng: -84.270020 }, ND: { lat: 47.650589, lng: -100.437012 },
  MN: { lat: 46.392410, lng: -94.636230 }, OK: { lat: 36.084621, lng: -96.921387 },
  MT: { lat: 46.965260, lng: -109.533691 }, WA: { lat: 47.751076, lng: -120.740135 },
  UT: { lat: 39.419220, lng: -111.950684 }, CO: { lat: 39.113014, lng: -105.358887 },
  OH: { lat: 40.367474, lng: -82.996216 }, AL: { lat: 32.318230, lng: -86.902298 },
  IA: { lat: 42.032974, lng: -93.581543 }, NM: { lat: 34.307144, lng: -106.018066 },
  SC: { lat: 33.836082, lng: -81.163727 }, PA: { lat: 41.203323, lng: -77.194527 },
  AZ: { lat: 34.048927, lng: -111.093735 }, MD: { lat: 39.045753, lng: -76.641273 },
  MA: { lat: 42.407211, lng: -71.382439 }, CA: { lat: 36.778259, lng: -119.417931 },
  ID: { lat: 44.068203, lng: -114.742043 }, WY: { lat: 43.075970, lng: -107.290283 },
  NC: { lat: 35.782169, lng: -80.793457 }, LA: { lat: 30.391830, lng: -92.329102 },
};

function App() {
  const globeRef = useRef(null);
  const textAddedRef = useRef(false); // Ref to track if text has been added

  const [displayedCounties, setDisplayedCounties] = useState({ features: []});
  const [countyToAlerts, setCountyToAlerts] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedCounty, setClickedCounty] = useState(null);
  const [safetyTips, setSafetyTips] = useState([])
  const [stepsToTake, setStepsToTake] = useState([])
  const [description, setDescription] = useState("")
  const [cameraPosition, setCameraPosition] = useState({ lat: 30, lng: -90, altitude: 1.8 });
  const [textMesh, setTextMesh] = useState(null);


  function handleMenuItemSelect(item) {
    resetCounty();
    setSelectedItem(item);
  }

  function handleFadeOut(scene) {
    gsap.to(textMesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.75,
      onComplete: () => {
        scene.remove(textMesh);
        setTextMesh(null); 
      }
    });
  }

  function resetCounty() {
    setClickedCounty(null);
    setSafetyTips([]);
    setStepsToTake([]);
    setDescription("");
  }

  const zoomToLocation = (targetLat, targetLng) => {
    const currentPosition = {
      lat: globeRef.current.pointOfView().lat,
      lng: globeRef.current.pointOfView().lng,
      altitude: globeRef.current.pointOfView().altitude,
    };

    gsap.to(currentPosition, {
      lat: targetLat,
      lng: targetLng,
      altitude: 0.2,
      duration: 1,
      onUpdate: () => {
        globeRef.current.pointOfView({
          lat: currentPosition.lat,
          lng: currentPosition.lng,
          altitude: currentPosition.altitude,
        });
      },
    });
  };

  function handleCountyClick(e) {
    console.log(e);
    setSelectedItem(null);
    setClickedCounty(e);
    const state = stateMap[e.properties.STATEFP];

    console.log(stateCoordinates[state].lat, stateCoordinates[state].lng); 
    zoomToLocation(stateCoordinates[state].lat, stateCoordinates[state].lng);

    // Get the data for the model, just include the first element of the arrays
    var properties = {
      ends: e.properties.ends[0],
      description: e.properties.descriptions[0],
      event: e.properties.events[0]
    }

    // Call summary backend
    axios.post('http://127.0.0.1:5000/summarize_description', {properties})
    .then(res => {
      // Set values
      if(res.status == 200) {
        console.log(res);
        setDescription(res.data.description);
      } else {
        console.error("Error in description summarizer API response", res)
      }
    })
    .catch(err => {
      console.error("Error fetching description summary", err);
      setDescription("No description available.");
    })

    // Call next steps and tips backend
    axios.post('http://127.0.0.1:5000/incident_tips', {properties})
    .then(res => {
      // Set values
      if(res.status == 200) {
        setSafetyTips(res.data.safety_tips);
      } else {
        console.error("Error in tips API response", res)
      }
    })
    .catch(err => {
      console.error("Error in tips API response", err);
      setSafetyTips(["No tips available."]);
    })

    // Call next steps and tips backend
    axios.post('http://127.0.0.1:5000/incident_steps', {properties})
    .then(res => {
      // Set values
      if(res.status == 200) {
        setStepsToTake(res.data.steps_to_take);
      } else {
        console.error("Error in next steps API response", res)
      }
    })
    .catch(err => {
      console.error("Error in next steps API response", err);
      setStepsToTake(["No next steps available."]);
    })
  }

  function getTopSeverity(current, newVal) {
    const severities = ["Extreme", "Severe", "Moderate", "Minor", "Unknown"];
    const currentIndex = severities.indexOf(current);
    const newIndex = severities.indexOf(newVal);

    return currentIndex < newIndex ? current : newVal;
  }

  function severityToColor(severity) {
    switch (severity) {
      case "Extreme":
        return "#FF0000"; // Red
      case "Severe":
        return "#FFA500"; // Orange
      case "Moderate":
        return "#FFFF00"; // Yellow
      case "Minor":
        return "#1a75ff";
      default:
        return "#A9A9A9"; // Gray
    }
  }

  async function getActiveAlerts() {
    try {
      const zoneToCountyResponse = await fetch('./zone_to_county.json');
      const zoneToCountyData = await zoneToCountyResponse.json();

      const alertsResponse = await axios.get("https://api.weather.gov/alerts/active");
      const alertsData = alertsResponse.data.features;

      const ugcSet = new Set();
      const ugcToFeatureMap = {};

      alertsData.forEach(feature => {
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

      const countySet = new Set();
      const countyToZonesMap = {};

      ugcSet.forEach(ugcCode => {
        if (zoneToCountyData[ugcCode]) {
          const county = zoneToCountyData[ugcCode];
          countySet.add(county);

          if (!countyToZonesMap[county]) {
            countyToZonesMap[county] = [];
          }
          countyToZonesMap[county].push(...ugcToFeatureMap[ugcCode]);
        }
      });

      setCountyToAlerts(countyToZonesMap)

      // console.log("County to Zones Map:", countyToZonesMap);
  
      // console.log("County Set:", countySet);
  
      // Fetch all zones
      const countiesResponse = await fetch(`./counties.geojson?timestamp=${new Date().getTime()}`);
      const countiesData = await countiesResponse.json();
      const filteredCounties = [];
      for (const feature of countiesData.features) {
        const state = stateMap[feature.properties.STATEFP];
        const county = feature.properties.NAME;
        if (countySet.has(`${state}-${county}`)) {
          
          var severity = "Unknown";
          var headlines = [];
          var descriptions = [];
          var areas = [];
          var events = [];
          var ends = [];
          for (const alert of countyToZonesMap[`${state}-${county}`]) {
            severity = getTopSeverity(severity, alert.properties.severity);
            headlines.push(alert.properties.headline);
            descriptions.push(alert.properties.description);
            areas.push(alert.properties.areaDesc);
            events.push(alert.properties.event);
            ends.push(alert.properties.ends);
          }

          feature.properties.severity = severity;
          feature.properties.headlines = headlines;
          feature.properties.descriptions = descriptions;
          feature.properties.areas = areas;
          feature.properties.events = events;
          feature.properties.ends = ends;

          filteredCounties.push(feature);
        }
      }

      setDisplayedCounties({ features: filteredCounties });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (globeRef.current && !textAddedRef.current) {
      textAddedRef.current = true;

      console.log(textAddedRef)
      console.log("HERE");
      const scene = globeRef.current.scene();

      const sunlight = new THREE.DirectionalLight(0xffffff, 3);
      sunlight.position.set(50, 50, 50);
      scene.add(sunlight);
  
      const loader = new FontLoader();
      loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry('Click or search to begin', {
          font: font,
          size: 3,
          height: 1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: 5
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
      // Compute the bounding box of the text geometry
      textGeometry.computeBoundingBox();
      const boundingBox = textGeometry.boundingBox;
      const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
      const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
      const centerZ = (boundingBox.max.z - boundingBox.min.z) / 2;

      // Create a group and add the text mesh to the group
      const textGroup = new THREE.Group();
      textGroup.add(textMesh);

      // Adjust the position of the text mesh within the group to center it
      textMesh.position.set(-centerX, -centerY, -centerZ);

      // Rotate the group instead of the text mesh
      textGroup.rotation.y = -Math.PI / 2;
      // textGroup.rotation.x = Math.PI / 1.1;


      // Set the position of the group
      textGroup.position.set(-150, 115, -1); // Adjust position as needed

      setTextMesh(textGroup);
      scene.add(textGroup);
      });

      getActiveAlerts();
    }
  }, []);

  useEffect(() => {
    if(globeRef.current) {
      const scene = globeRef.current.scene();
      const controls = globeRef.current.controls();
      controls.addEventListener('change', () => {
        const isWithinRange = (value, target, range) => Math.abs(value - target) <= range;
        const targetPosition = { x: -242.34768052722947, y: 140.22991192613964, z: -1.781444430520931 };
        if (textMesh && (isWithinRange(controls._lastPosition.x, targetPosition.x, 5) &&
                          isWithinRange(controls._lastPosition.y, targetPosition.y, 5) &&
                          isWithinRange(controls._lastPosition.z, targetPosition.z, 5))) {
          setTimeout(() => handleFadeOut(scene), 2000);
        }
      });
    }
  }, [textMesh])

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
    <div className="relative h-screen w-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        onMenuItemSelect={handleMenuItemSelect}
        counties={displayedCounties.features}
        onCountySelect={handleCountyClick}
      />
      <Legend />

      {/* Cards with Animations */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedItem(null);
              }
            }}
          >
            {/* Container for both Cards */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-4">
              {/* Left Card */}
              <motion.div
                key={`left-${selectedItem}`}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <Card
                  title={selectedItem}
                  position="left"
                  onClose={() => setSelectedItem(null)}
                />
              </motion.div>

              {/* Right Card */}
              <motion.div
                key={`right-${selectedItem}`}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <Card
                  title={selectedItem}
                  position="right"
                  onClose={() => setSelectedItem(null)}
                />
              </motion.div>
            </div>
          </div>
        )}
        {clickedCounty && (
          <div
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetCounty();
            }
          }}
        >
          {/* Container for both Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
            {/* Left Card */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full w-screen max-w-2xl"
            >
              <CountyCard
                county={clickedCounty}
                description={description}
                safetyTips={safetyTips}
                stepsToTake={stepsToTake}
                stateMap={stateMap}
                onClose={() => resetCounty()}
              />
            </motion.div>
          </div>
        </div>
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
            polygonCapColor={({ properties: p }) => severityToColor(p.severity)}
            polygonSideColor={({ properties: p }) => severityToColor(p.severity)}
            polygonAltitude={0.001}
            polygonLabel={({ properties: p }) => `<p className="text-black">
            <b className="text-black">${p.NAME}, ${stateMap[p.STATEFP]}</b> <br />
            Severity: <i>${p.severity}</i></p>
            `}
            onPolygonClick={handleCountyClick}

            // stars in atmosphere?
            customLayerData={[...Array(500).keys()].map(() => ({
              lat: (Math.random() - 1) * 360,
              lng: (Math.random() - 1) * 360,
              altitude: Math.random() * 2 + 0.5,
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
