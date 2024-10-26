import React from "react";
import Globe from "react-globe.gl";
import axios from "axios";
import { useEffect, useState } from "react";

function handleGlobeClick(e) {
  console.log(e);
}

function App() {

  const [markers, setMarkers] = useState([]);
  // test
  useEffect(() => {
    // load data
    axios.get('https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations')
      .then((res) => {
        const { features } = res.data; 
        setMarkers(features);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);



  const weightColor = [];


  return (
    <div>
      <div className="flex flex-row h-full">
        <Globe
            onGlobeClick={handleGlobeClick}/>
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
