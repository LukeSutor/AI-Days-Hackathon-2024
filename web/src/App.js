import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";

function handleGlobeClick(e) {
  console.log(e);
}

function handleZoom(e) {
  console.log(e);
}

function App() {
  const [markers, setMarkers] = useState([]);
  const [counties, setCounties] = useState({ features: []});
  // test
  useEffect(() => {
    // load data
    axios.get('https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations')
      .then((res) => {
        const { features } = res.data; 
        setMarkers(features);
      })
      .catch((err) => console.error("Error fetching data:", err));

      // Load county data
      fetch('./counties.geojson').then(res => res.json()).then(setCounties);
  }, []);



  const weightColor = [];


  return (
    <div>
      <div className="flex flex-row h-full">
        <Globe
            globeImageUrl="./earth.jpg"
            polygonsData={counties.features}
            polygonStrokeColor={() => '#000000'}
            polygonCapColor={() => '#fff'}
            onGlobeClick={handleGlobeClick}
            onZoom={handleZoom}/>
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
