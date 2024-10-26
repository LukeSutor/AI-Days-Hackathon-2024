import React from 'react';

const Card = ({ title, position, onClose }) => {
  let content;
  switch (title) {
    case 'How a Disaster Gets Declared':
      content = (
        <div className=''>
          <h2 className="card-title">How a Disaster Gets Declared</h2>
          <ul className="list-disc pl-5">
            <li>Local government declares a state of emergency.</li>
            <li>State government requests federal assistance.</li>
            <li>President declares a disaster.</li>
          </ul>
        </div>
      );
      break;
    case 'Disaster Authorities':
        content = (
            <div className=''>
            <h2 className="card-title">Disaster Authorities</h2>
            <ul className="list-disc pl-5">
                <li>Federal Emergency Management Agency (FEMA)</li>
                <li>State Emergency Management Agency (SEMA)</li>
                <li>Local Emergency Management Agency (LEMA)</li>
            </ul>
            </div>
        );
      break;
    case 'Historic Disasters':
        content = (
            <div className=''>
            <h2 className="card-title">Historic Disasters</h2>
            <ul className="list-disc pl-5">
                <li>1906 San Francisco Earthquake</li>
                <li>1927 Mississippi River Flood</li>
                <li>2005 Hurricane Katrina</li>
            </ul>
            </div>
        );
        break;
    case 'Common Rumors':
        content = (
            <div className=''>
            <h2 className="card-title">Common Rumors</h2>
            <ul className="list-disc pl-5">
                <li>Gas leaks are common after a disaster.</li>
                <li>Water is safe to drink after a disaster.</li>
                <li>Power lines are safe to touch after a disaster.</li>
            </ul>
            </div>
        );
        break;
    case 'Save Your Family Treasures':
        content = (
            <div className=''>
            <h2 className="card-title">Save Your Family Treasures</h2>
            <ul className="list-disc pl-5">
                <li>Store important documents in a safe place.</li>
                <li>Take photos of family heirlooms.</li>
                <li>Back up digital photos and documents.</li>
            </ul>
            </div>
        );
        break;
    case 'Volunteer and Donate':
        content = (
            <div className=''>
            <h2 className="card-title">Volunteer and Donate</h2>
            <ul className="list-disc pl-5">
                <li>Volunteer with local organizations.</li>
                <li>Donate to local charities.</li>
                <li>Support disaster relief efforts.</li>
            </ul>
            </div>
        );
        break;
    case 'Governments and Private Non-Profits':
        content = (
            <div className=''>
            <h2 className="card-title">Governments and Private Non-Profits</h2>
            <ul className="list-disc pl-5">
                <li>Local government provides emergency services.</li>
                <li>State government coordinates disaster response.</li>
                <li>Private non-profits offer assistance to survivors.</li>
            </ul>
            </div>
        );
        break;
    case 'Individuals and Families':
        content = (
            <div className=''>
            <h2 className="card-title">Individuals and Families</h2>
            <ul className="list-disc pl-5">
                <li>Register for disaster assistance.</li>
                <li>Apply for disaster loans and grants.</li>
                <li>Seek help from local charities.</li>
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