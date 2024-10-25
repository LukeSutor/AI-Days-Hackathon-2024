import React from "react";
import Globe from "react-globe.gl";

function handleGlobeClick(e) {
  console.log(e);
}

function App() {
  return (
    <div>
      <div className="flex flex-row h-full">
        <Globe 
            globeImageUrl="./earth.jpg"
            bumpImageUrl="./heightmap.png"
            onGlobeClick={handleGlobeClick}/>
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
