import React from "react";

const CountyCard = ({ county, description, safetyTips, stepsToTake, stateMap, onClose }) => {
  function severityToColor(severity) {
    switch (severity) {
      case "Extreme":
        return "text-red-600"; // Red
      case "Severe":
        return "text-orange-500"; // Orange
      case "Moderate":
        return "text-yellow-500"; // Yellow
      case "Minor":
        return "text-blue-600";
      default:
        return "text-gray-600"; // Gray
    }
  }

  return (
    <div className={`card bg-white text-black border border-gray-300 shadow-xl`}>
      <div className="card-body relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-800"
          aria-label="Close Card"
        >
          ✕
        </button>
        <div className="max-h-[75vh] overflow-y-scroll">
          <p>{county.properties.NAME}, {stateMap[county.properties.STATEFP]}</p>
          <p className="text-3xl"><b>{county.properties.events[0]}</b></p>
          <p className={`font-semibold ${severityToColor(county.properties.severity)}`}>{county.properties.severity}</p>
          <p className="text-xl font-semibold">Description:</p>
          <div className="ml-4">
            {description == "" ? (
              <div className="flex flex-col space-y-2 w-full my-2">
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
              </div>
            ) : (
              <p>{description}</p>
            )}
          </div>
          <p className="text-xl font-semibold">Safety Tips:</p>
          <div className="ml-4">
            {safetyTips.length == 0 ? (
              <div className="flex flex-col space-y-2 w-full my-2">
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
              </div>
            ) : (
              <ol className="list-decimal list-inside">
                {safetyTips.map((tip) => {
                  return (
                    <li key={tip}>{tip}</li>
                  );
                })}
              </ol>
            )}
          </div>
          <p className="text-xl font-semibold">Steps to Take:</p>
          <div className="ml-4">
            {stepsToTake.length == 0 ? (
              <div className="flex flex-col space-y-2 w-full my-2">
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded-lg" />
              </div>
            ) : (
              <ol className="list-decimal list-inside">
                {stepsToTake.map((step) => {
                  return (
                    <li key={step}>{step}</li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountyCard;