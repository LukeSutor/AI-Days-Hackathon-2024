import React from 'react';


const legendItems = [
  { label: 'Extreme', color: '#FF0000' },  // Red
  { label: 'Severe', color: '#FFA500' },   // Orange
  { label: 'Moderate', color: '#FFFF00' }, // Yellow
  { label: 'Minor', color: '#1a75ff' },    // Blue
  { label: 'Unknown', color: '#A9A9A9' },  // Gray
];

const Legend = () => {
  return (
    <div className=" m-1 border-2 border-white bg-black bg-opacity-50 p-8 text-white rounded shadow-lg flex flex-col space-y-2 z-50">
      <h1 className="text-xl font-semibold mb-2">Severity</h1>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index} className="flex items-center mb-1">
            <span
              className="w-4 h-4 mr-4 rounded-full"
              style={{ backgroundColor: item.color }}
              title={`Severity: ${item.label}`}
            ></span>
            <span className="text-lg">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
