import React from "react";
import Globe from "react-globe.gl";

function App() {
  return (
    <div>
      <div className="flex flex-row h-full">
        <div className="w-1/2 bg-black">
          <Globe />
        </div>
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
