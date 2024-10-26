// Card.js
import React from 'react';

const Card = ({ title, position, onClose }) => {
  let content;
  switch(title) {
    case 'How a Disaster Gets Declared':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">How a Disaster Gets Declared</h2>
            <ul className="list-disc pl-5">
              <li>Local government declares a state of emergency.</li>
              <li>State government requests federal assistance.</li>
              <li>President declares a disaster.</li>
              <li>Activation of emergency response protocols.</li>
              <li>Mobilization of federal resources and agencies.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Process Overview</h2>
            <p>
              The declaration process involves multiple levels of government to ensure a coordinated and effective response. Once a disaster is declared, federal agencies like FEMA are activated to provide necessary support.
            </p>
            <h3 className="text-lg font-medium mt-4">Key Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Assessment of disaster impact.</li>
              <li>Determination of eligibility for federal aid.</li>
              <li>Deployment of resources and personnel.</li>
              <li>Continuous monitoring and support.</li>
            </ol>
          </div>
        );
      }
      break;
    case 'Disaster Authorities':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Disaster Authorities</h2>
            <ul className="list-disc pl-5">
              <li>Federal Emergency Management Agency (FEMA)</li>
              <li>State Emergency Management Agency (SEMA)</li>
              <li>Local Emergency Management Agency (LEMA)</li>
              <li>National Guard</li>
              <li>Red Cross</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Roles and Responsibilities</h2>
            <p>
              Each authority plays a crucial role in disaster management:
            </p>
            <h3 className="text-lg font-medium mt-4">FEMA:</h3>
            <p>
              Coordinates the federal government's response to natural and man-made disasters, providing financial assistance and resources.
            </p>
            <h3 className="text-lg font-medium mt-4">SEMA:</h3>
            <p>
              Manages state-level disaster response, coordinating with local agencies and FEMA.
            </p>
            <h3 className="text-lg font-medium mt-4">LEMA:</h3>
            <p>
              Handles local emergency responses, including evacuation orders, shelter management, and public safety.
            </p>
          </div>
        );
      }
      break;
    case 'Historic Disasters':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Historic Disasters</h2>
            <ul className="list-disc pl-5">
              <li>1906 San Francisco Earthquake</li>
              <li>1927 Mississippi River Flood</li>
              <li>2005 Hurricane Katrina</li>
              <li>2011 Tōhoku Earthquake and Tsunami</li>
              <li>2020 Hurricane Laura</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Impact and Lessons Learned</h2>
            <p>
              Each historic disaster has taught valuable lessons in emergency preparedness and response. Understanding these events helps improve future disaster management strategies.
            </p>
            <h3 className="text-lg font-medium mt-4">Key Learnings:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Importance of early warning systems.</li>
              <li>Effective coordination between agencies.</li>
              <li>Community resilience and recovery planning.</li>
              <li>Technological advancements in disaster response.</li>
            </ol>
          </div>
        );
      }
      break;
    case 'Common Rumors':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Common Rumors</h2>
            <ul className="list-disc pl-5">
              <li>Gas leaks are common after a disaster.</li>
              <li>Water is safe to drink after a disaster.</li>
              <li>Power lines are safe to touch after a disaster.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Debunking Myths</h2>
            <p>
              It's crucial to address and correct misinformation during disasters to ensure public safety and effective response.
            </p>
            <h3 className="text-lg font-medium mt-4">Myth vs. Fact:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Myth:</strong> Gas leaks are common after a disaster.
                <br />
                <strong>Fact:</strong> Gas leaks are rare and usually quickly addressed by authorities.
              </li>
              <li>
                <strong>Myth:</strong> Water is safe to drink after a disaster.
                <br />
                <strong>Fact:</strong> Water sources may be contaminated; it's essential to use bottled or boiled water.
              </li>
              <li>
                <strong>Myth:</strong> Power lines are safe to touch after a disaster.
                <br />
                <strong>Fact:</strong> Power lines can be live and pose a significant risk of electrocution.
              </li>
            </ul>
          </div>
        );
      }
      break;
    case 'Save Your Family Treasures':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Save Your Family Treasures</h2>
            <ul className="list-disc pl-5">
              <li>Store important documents in a safe place.</li>
              <li>Take photos of family heirlooms.</li>
              <li>Back up digital photos and documents.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Protecting Valuables</h2>
            <p>
              Safeguarding your family's treasures ensures that important memories and assets are preserved even in the face of disasters.
            </p>
            <h3 className="text-lg font-medium mt-4">Best Practices:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Use fireproof and waterproof safes for critical documents.</li>
              <li>Digitize photos and important papers and store them securely online.</li>
              <li>Regularly update and review your emergency plans with your family.</li>
              <li>Maintain a checklist of valuable items and their storage locations.</li>
            </ol>
          </div>
        );
      }
      break;
    case 'Volunteer and Donate':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Volunteer and Donate</h2>
            <ul className="list-disc pl-5">
              <li>Volunteer with local organizations.</li>
              <li>Donate to local charities.</li>
              <li>Support disaster relief efforts.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">How to Help</h2>
            <p>
              Volunteering and donating are vital ways to support communities affected by disasters.
            </p>
            <h3 className="text-lg font-medium mt-4">Volunteer Opportunities:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing shelter and food at local shelters.</li>
              <li>Assisting with cleanup and rebuilding efforts.</li>
              <li>Offering medical assistance and counseling.</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">Donation Tips:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Donate non-perishable food and water.</li>
              <li>Provide clothing and blankets.</li>
              <li>Contribute financially to reputable charities.</li>
            </ul>
          </div>
        );
      }
      break;
    case 'Governments and Private Non-Profits':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Governments and Private Non-Profits</h2>
            <ul className="list-disc pl-5">
              <li>Local government provides emergency services.</li>
              <li>State government coordinates disaster response.</li>
              <li>Private non-profits offer assistance to survivors.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Collaborative Efforts</h2>
            <p>
              Governments and private non-profits work together to deliver comprehensive disaster relief and recovery services.
            </p>
            <h3 className="text-lg font-medium mt-4">Key Collaborations:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Joint disaster response initiatives.</li>
              <li>Resource and information sharing.</li>
              <li>Community rebuilding projects.</li>
            </ul>
          </div>
        );
      }
      break;
    case 'Individuals and Families':
      if (position === 'left') {
        content = (
          <div>
            <h2 className="card-title">Individuals and Families</h2>
            <ul className="list-disc pl-5">
              <li>Register for disaster assistance.</li>
              <li>Apply for disaster loans and grants.</li>
              <li>Seek help from local charities.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">Personal Preparedness</h2>
            <p>
              Preparing individually and as a family can significantly reduce the impact of disasters.
            </p>
            <h3 className="text-lg font-medium mt-4">Preparation Tips:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create and practice a family emergency plan.</li>
              <li>Assemble a comprehensive emergency kit.</li>
              <li>Stay informed through reliable sources.</li>
            </ol>
          </div>
        );
      }
      break;
    default:
      content = null;
  }

  return (
    <div className={`card bg-white text-black border border-gray-300 shadow-xl ${position}`}>
      <div className="card-body relative overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-800"
          aria-label="Close Card"
        >
          ✕
        </button>
        {content}
      </div>
    </div>
  );
};

export default Card;
