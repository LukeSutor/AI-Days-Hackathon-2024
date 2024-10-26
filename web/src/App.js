import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";

const stateMap = {"01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY"};

function App() {
  const [markers, setMarkers] = useState([]);
  const [allCounties, setAllCounties] = useState({ features: []});
  const [displayedCounties, setDisplayedCounties] = useState({ features: []});
  const [disasterCounties, setDisasterCounties] = useState([]);
  
  function handleGlobeClick(e) {
    console.log(e);
  }
  
  function handleZoom(e) {
    console.log(e);
  }
  
  function getDateKWeeksInThePast(k = 1) {
    const now = new Date();
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const pastDate = new Date(now.getTime() - oneWeekInMilliseconds);
    return pastDate.toISOString();
  }

  function updateImpactedCounties() {
    // Get the date one week ago
    const filter_date = getDateKWeeksInThePast()
    console.log(filter_date);
  
    // Load affected counties
    axios.get(`https://www.fema.gov/api/open/v1/FemaWebDeclarationAreas?$filter=entryDate%20gt%20'${filter_date}'`)
      .then((affected_counties) => { 

        const declaredEmergencies = affected_counties.data.FemaWebDeclarationAreas;

        // Create a set of state-county pairs for efficient filtering
        const disasterSet = new Set();
        for (let i = 0; i < declaredEmergencies.length; i++) {
          const emergency = declaredEmergencies[i];
          const stateCode = emergency.stateCode.trim();
          var placeName = emergency.placeName.trim();
          // Get rid of the " (County)" ending
          placeName = placeName.replace(" (County)", "");
          disasterSet.add(`${stateCode}-${placeName}`);
        }
        console.log("SET", disasterSet)

        // Load all county data
        var allCounties2 = {features: []}
        fetch('./counties.geojson')
          .then(res => res.json())
          .then((all_counties) => {
          console.log("newcounties", all_counties)
          
          const filteredCounties = all_counties.features.filter(county => {
            const state = stateMap[county.properties.STATEFP];
            const name = county.properties.NAME.trim();
            return disasterSet.has(`${state}-${name}`);
          });
  
          console.log("filter", filteredCounties)
  
          setDisplayedCounties({ features: filteredCounties });
        });
        

 

        console.log("Allcounties", allCounties2);

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



  const weightColor = [];


  return (
    <div>
      <div className="flex flex-row h-full">
        <Globe
            globeImageUrl="./earth.jpg"
            polygonsData={displayedCounties.features}
            polygonStrokeColor={() => '#000000'}
            polygonCapColor={() => '#fff'}
            onGlobeClick={handleGlobeClick}
            onPolygonClick={handleGlobeClick}
            // onZoom={handleZoom}
            />
        <div className="w-1/2">

        </div>
      </div>
    </div>
  );
}

export default App;
