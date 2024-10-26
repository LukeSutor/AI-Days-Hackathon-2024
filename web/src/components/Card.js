import React from 'react';

const Card = ({ title, position, onClose }) => {
  let content;
  switch (title) {
    case 'General Tips':
      content = (
        <div className=''>
          <h2 className="card-title">General Tips</h2>
          <ul className="list-disc pl-5">
            <li>Create an emergency kit with essentials.</li>
            <li>Develop a family communication plan.</li>
            <li>Stay informed about local alerts and warnings.</li>
            <li>Know your evacuation routes.</li>
          </ul>
        </div>
      );
      break;
    case 'Resources':
      content = (
        <div className=''>
          <h2 className="card-title">Resources</h2>
          <ul className="list-disc pl-5">
            <li><a href="https://www.ready.gov/" target="_blank" rel="noopener noreferrer">Ready.gov</a></li>
            <li><a href="https://www.redcross.org/" target="_blank" rel="noopener noreferrer">Red Cross</a></li>
            <li><a href="https://www.fema.gov/" target="_blank" rel="noopener noreferrer">FEMA</a></li>
          </ul>
        </div>
      );
      break;
    case 'After the incident':
      content = (
        <div className=''>
          <h2 className="card-title">After the Incident</h2>
          <ul className="list-disc pl-5">
            <li>Ensure your safety before returning home.</li>
            <li>Check for structural damage.</li>
            <li>Contact your insurance company.</li>
            <li>Seek assistance if needed.</li>
          </ul>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className={`card bg-red text-white border border-white shadow-xl ${position}`}>
      <div className="card-body relative overflow-y-auto">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>
        {content}
      </div>
    </div>
  );
};

export default Card;
