import React from "react";

const CountyCard = ({ county, description, safetyTips, stepsToTake, onClose }) => {
    return (
      <div className={`card bg-white text-black border border-gray-300 shadow-xl`}>
        <div className="card-body relative overflow-y-auto p-6">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-800"
            aria-label="Close Card"
          >
            ✕
          </button>
          <p className="text-3xl"><b>{county.properties.events[0]}</b></p>
          <p className="text-xl font-semibold">Description:</p>
          <div className="ml-4">
            {description == "" ? (
              <div className="flex items-end">Loading
                <div className="flex space-x-1 pb-1 ml-1">
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce"></div>
                </div>
              </div>
            ) : (
              <p>{description}</p>
            )}
          </div>
          <p className="text-xl font-semibold">Safety Tips:</p>
          <div className="ml-4">
            {safetyTips.length == 0 ? (
              <div className="flex items-end">Loading
                <div className="flex space-x-1 pb-1 ml-1">
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce"></div>
                </div>
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
              <div className="flex items-end">Loading
                <div className="flex space-x-1 pb-1 ml-1">
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1 w-1 bg-black rounded-full animate-bounce"></div>
                </div>
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
    )
}

export default CountyCard;