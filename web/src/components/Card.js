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
              <h3 className="text-lg font-medium mt-4">Preliminary Damage Assessment (PDA):</h3>
              <li>Before the state requests federal assistance, a joint team from FEMA, the state, and local officials assesses the scale of damage.</li>
              <h3 className="text-lg font-medium mt-4">Types of Federal Assistance: </h3>
              <li>If approved, federal aid can come in the form of Individual Assistance (for individuals and households), Public Assistance (for infrastructure), and Hazard Mitigation assistance.</li>
              <h3 className="text-lg font-medium mt-4">Coordination with NGOs and Private Sector: </h3>
              <li>Often, local and state governments collaborate with non-governmental organizations and private sector partners in the early stages to manage resources effectively.</li>
              <h3 className="text-lg font-medium mt-4">Federal Coordination Assistance: </h3>
              <li>FEMA and other federal agencies coordinate with local emergency management to streamline disaster response and ensure effective resource allocation.</li>

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
              <li>Initial Notification and Situation Report: Local and state authorities inform FEMA about the disaster, providing a situation report that includes potential impacts and immediate needs.</li>
              <li>Disaster Assistance Program Activation: Once the disaster is declared, specific programs like the Community Disaster Loan Program, Crisis Counseling Assistance, and the Disaster Unemployment Assistance Program may be activated to support affected communities.</li>
              <li>Public Communication Strategy: Federal and state authorities implement communication strategies to keep the public informed about available resources, safety information, and recovery timelines.</li>
              <li>Recovery and Reconstruction Phase: After immediate response efforts, federal support transitions to longer-term recovery, reconstruction, and resilience-building initiatives to prevent future disaster impacts.</li>
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
              <h3 className="text-lg font-medium mt-4">U.S. Army Corps of Engineers (USACE): </h3>
              <li>Plays a role in managing and mitigating flood risks, providing engineering expertise and resources in response to natural disasters.</li>
              <h3 className="text-lg font-medium mt-4">Centers for Disease Control and Prevention (CDC): </h3>
              <li>Offers support for public health emergencies, including disease outbreaks that may occur after natural disasters.</li>
              <h3 className="text-lg font-medium mt-4">Department of Housing and Urban Development (HUD): </h3>
              <li>Assists in rebuilding housing and infrastructure in disaster-stricken areas through grants and other financial aid.</li>
              <h3 className="text-lg font-medium mt-4">Voluntary Organizations Active in Disaster (VOAD): </h3>
              <li>A coalition of organizations that collaborate on providing aid, such as food, shelter, and emotional support, during disaster recovery.</li>
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
              In addition to response coordination, FEMA also provides training and resources to enhance the preparedness of state and local agencies through programs like the National Incident Management System (NIMS) and the Incident Command System (ICS).
            </p>
            <h3 className="text-lg font-medium mt-4">SEMA:</h3>
            <p>
            Besides coordinating disaster response, SEMA is also responsible for state-level disaster preparedness programs, including risk assessments and resource allocation for potential emergencies.
            </p>
            <h3 className="text-lg font-medium mt-4">LEMA:</h3>
            <p>
            Often the first to respond, LEMA also coordinates with local volunteer organizations and community groups to ensure timely support for affected populations.
            </p>
            <h3 className="text-lg font-medium mt-4">National Guard:</h3>
            <p>
            Assists in search and rescue, medical aid, logistics, and sometimes law enforcement during extreme disaster situations. They support FEMA and state authorities as needed.
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
              <h3 className="text-lg font-medium mt-4">1980 Mount St. Helens Eruption:</h3>
              <li>A volcanic eruption in Washington State that highlighted the need for geological monitoring and disaster preparedness for less frequent but high-impact events.</li>
              <h3 className="text-lg font-medium mt-4">2017 Hurricane Harvey:</h3>
              <li>Resulted in unprecedented flooding in Houston, Texas, and underscored the importance of urban planning and flood mitigation strategies in disaster-prone areas.</li>
              <h3 className="text-lg font-medium mt-4">2010 Haiti Earthquake:</h3>
              <li>Led to international efforts in disaster relief and showed the need for robust infrastructure and disaster response in vulnerable regions.</li>
              <h3 className="text-lg font-medium mt-4">1935 Labor Day Hurricane:</h3>
              <li>The most intense hurricane to strike the U.S. up until that point, this disaster spurred the development of the National Weather Service's hurricane warning system.</li>
              <h3 className="text-lg font-medium mt-4">1989 Loma Prieta Earthquake:</h3>
              <li>A major earthquake in the San Francisco Bay Area that brought attention to the importance of retrofitting buildings to withstand seismic activity.</li>
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
              <li>Investment in Infrastructure Resilience: Historical disasters have shown the need for stronger, disaster-resistant infrastructure to minimize damage in high-risk areas.</li>
              <li>Role of International Collaboration: Some disasters, like the Tōhoku earthquake, demonstrated how international aid and cooperation can accelerate recovery and provide resources beyond local capacities.</li>
              <li>Importance of Public Education and Preparedness: Encouraging communities to understand disaster risks and preparedness measures has proven crucial for reducing casualties and ensuring quicker response times.</li>
              <li>Adaptation to Climate Change: Recent disasters emphasize the importance of incorporating climate resilience into disaster response plans as extreme weather events become more frequent.</li>
              <li>Enhanced Use of Data and Technology: From satellite imagery to predictive modeling, advancements in data analytics have improved disaster forecasting and response strategies, allowing agencies to act swiftly and effectively.
              </li>
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
              <h3 className="text-lg font-medium mt-4">Key Learnings:</h3>
              <li>Tsunamis only occur after major earthquakes: Tsunamis can result from underwater landslides or volcanic eruptions, not just earthquakes.</li>
              <li>Emergency services will immediately respond everywhere: After large-scale disasters, emergency services prioritize critical areas and may not reach all locations immediately.</li>
              <li>Food from cans and jars is unsafe after a disaster: As long as cans or jars are intact and not exposed to contaminants, the food inside is generally safe to consume.</li>
              <li>Masks aren’t needed for post-disaster cleanup: Post-disaster environments may contain hazardous materials, so wearing protective masks and gear is advised.</li>
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
                <strong>Myth:</strong> Only coastal areas are at risk for tsunamis..
                <br />
                <strong>Fact:</strong> While coastal areas are most at risk, inland regions near large bodies of water can also be affected by tsunamis.
              </li>
              <li>
                <strong>Myth:</strong> Animals can predict disasters and will warn people..
                <br />
                <strong>Fact:</strong> Animals may behave differently before disasters, but there is no reliable evidence that they can accurately predict them in time to provide effective warning.
              </li>
              <li>
                <strong>Myth:</strong> Flashlights and electronics are safe to use around gas leaks..
                <br />
                <strong>Fact:</strong> Any spark, even from turning on electronics, can ignite gas, so it’s safer to avoid using them around potential leaks.
              </li>
              <li>
                <strong>Myth:</strong> Opening windows during a tornado equalizes pressure and prevents damage.
                <br />
                <strong>Fact:</strong> Opening windows doesn't prevent damage; instead, it wastes time that could be used to find shelter.
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
              <h3 className="text-lg font-medium mt-4">Create a Family Emergency Kit: </h3>
              <li>Include copies of important documents, a USB drive with digital copies of photos, and a small selection of irreplaceable items.</li>
              <h3 className="text-lg font-medium mt-4">Consider Off-site Storage: </h3>
              <li>Keep duplicates of essential documents in a secure off-site location, such as a safe deposit box.</li>
              <h3 className="text-lg font-medium mt-4">Label and Catalog Heirlooms: </h3>
              <li>Create a detailed list of family heirlooms with descriptions, photos, and their storage locations. This can help with insurance claims if they’re damaged or lost.</li>
              <h3 className="text-lg font-medium mt-4">Protect Digital Data: </h3>
              <li>Regularly back up digital photos and documents to a cloud service or external hard drive. Store these backups in a safe place.</li>
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
              <li>Utilize Cloud Storage Services: Services like Google Drive, iCloud, or Dropbox can securely store digital copies of critical documents, making them accessible anywhere.</li>
              <li>Identify Essential Documents: Make a list of essential documents like birth certificates, passports, insurance policies, and wills, and ensure they’re stored in a secure, accessible place.</li>
              <li>Take Preventive Measures for Home Safety: Install smoke detectors, fire extinguishers, and, if in a flood-prone area, elevate valuable items to reduce damage risk.</li>
              <li>Secure Important Data on Portable Drives: Keep a password-protected, encrypted portable drive with important documents as a backup that you can easily take with you in case of evacuation.</li>
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
              <h3 className="text-lg font-medium mt-4">Volunteer with Local Organizations:</h3>
              <li>Engage with local non-profits, community centers, and relief agencies that need assistance during and after disasters. This can include providing manpower for distributing supplies, assisting with cleanup efforts, and offering emotional support to affected families.</li>
              <h3 className="text-lg font-medium mt-4">Organize Community Drives:</h3>
              <li>Coordinate with neighbors and friends to collect essential supplies like non-perishable foods, hygiene products, and first-aid kits. Community drives can amplify resources and make a larger impact on disaster relief efforts.</li>
              <h3 className="text-lg font-medium mt-4">Support Disaster Relief Efforts:</h3>
              <li>Contribute financially to local or national disaster relief funds. Many organizations specialize in various aspects of disaster response, from immediate relief to long-term recovery, and financial support helps ensure they can respond quickly and efficiently.</li>
              <h3 className="text-lg font-medium mt-4">Assist Vulnerable Populations:</h3>
              <li>Consider volunteering with organizations that focus on vulnerable groups, like the elderly, disabled, and low-income families, who may face unique challenges during disasters. Helping these populations ensures that assistance reaches those who need it most.</li>
            </ul>
          </div>
        );
      } else if (position === 'right') {
        content = (
          <div>
            <h2 className="card-title">How to Help</h2>
            <p>
              Volunteering and donating are vital ways to support communities affected by disasters. Your contributions can directly impact the recovery and resilience of those affected.
            </p>
            <h3 className="text-lg font-medium mt-4">Volunteer Opportunities:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing shelter and food at local shelters: Many shelters require volunteers to prepare meals, set up temporary housing, and provide basic needs for displaced individuals.</li>
              <li>Assisting with cleanup and rebuilding efforts: Post-disaster, there is often debris to clear and structures to repair. Volunteering for cleanup efforts helps restore normalcy and rebuilds community resilience.</li>
              <li>Offering medical assistance and counseling: If you have medical or counseling training, your expertise can be invaluable in supporting physical and mental health recovery efforts.</li>
            </ul>
            <h3 className="text-lg font-medium mt-4">Donation Tips:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Donate non-perishable food and water: These are crucial for immediate relief and can be distributed to shelters and impacted families.</li>
              <li>Provide clothing and blankets: Essential items like warm clothing, socks, and blankets are often needed, especially in colder climates or during winter months.</li>
              <li>Contribute financially to reputable charities: Monetary donations are flexible, allowing charities to purchase exactly what is needed. Research organizations to ensure they are credible and transparent about fund usage.</li>
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
                  <h3 className="text-lg font-medium mt-4">Local Government Services:</h3>
                  <li>Local governments provide essential emergency services such as fire, police, and medical aid. They also enforce evacuation orders and provide updates to the public, ensuring a coordinated response within the community.</li>
                  <h3 className="text-lg font-medium mt-4">State Government Coordination:</h3>
                  <li>State governments oversee disaster response by deploying resources from the National Guard, managing state-level relief funds, and coordinating with federal agencies like FEMA for additional support when necessary.</li>
                  <h3 className="text-lg font-medium mt-4">Role of Private Non-Profits:</h3>
                  <li>Non-profit organizations, such as the Red Cross and local charities, play a critical role in providing shelter, food, counseling, and other services to disaster survivors. These organizations rely on donations and volunteers to operate effectively.</li>
                  <h3 className="text-lg font-medium mt-4">Engaging the Private Sector:</h3>
                  <li>Private companies often contribute by donating supplies, offering logistical support, and providing financial assistance. They may also partner with non-profits to expedite aid delivery and recovery efforts.</li>
                </ul>
              </div>
            );
          } else if (position === 'right') {
            content = (
              <div>
                <h2 className="card-title">Collaborative Efforts</h2>
                <p>
                  Governments and private non-profits work together to deliver comprehensive disaster relief and recovery services. Their combined efforts ensure that resources reach those affected and that recovery is swift and effective.
                </p>
                <h3 className="text-lg font-medium mt-4">Key Collaborations:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Joint disaster response initiatives: Coordinated responses between local, state, and federal agencies streamline efforts and reduce overlapping services.</li>
                  <li>Resource and information sharing: Efficient resource allocation and information dissemination among agencies and organizations ensure that relief efforts are well-informed and targeted.</li>
                  <li>Community rebuilding projects: Non-profits often work with governments on long-term recovery projects, such as rebuilding homes, schools, and infrastructure, to restore normalcy in affected areas.</li>
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
                  <h3 className="text-lg font-medium mt-4">Register for Disaster Assistance:</h3>
                  <li>Individuals can apply for federal assistance through FEMA, including financial support for temporary housing, medical expenses, and property repairs.</li>
                  <h3 className="text-lg font-medium mt-4">Apply for Disaster Loans and Grants:</h3>
                  <li>The Small Business Administration (SBA) offers low-interest disaster loans to help homeowners and renters repair or replace damaged property.</li>
                  <h3 className="text-lg font-medium mt-4">Seek Help from Local Charities:</h3>
                  <li>Charities provide essential items like food, water, clothing, and sometimes financial assistance to help families recover after a disaster.</li>
                  <h3 className="text-lg font-medium mt-4">Connect with Community Support Groups:</h3>
                  <li>Many communities have support groups and networks that provide emotional and practical support, such as neighborhood associations, faith-based organizations, and counseling services.</li>
                </ul>
              </div>
            );
        } else if (position === 'right') {
            content = (
              <div>
                <h2 className="card-title">Personal Preparedness</h2>
                <p>
                  Preparing individually and as a family can significantly reduce the impact of disasters. Personal preparedness increases safety and improves response time in emergencies.
                </p>
                <h3 className="text-lg font-medium mt-4">Preparation Tips:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Create and practice a family emergency plan: Outline steps for communication, meeting places, and evacuation routes for each family member in case of an emergency.</li>
                  <li>Assemble a comprehensive emergency kit: Include essentials like water, non-perishable food, medications, first-aid supplies, flashlights, and batteries to sustain your family for at least 72 hours.</li>
                  <li>Stay informed through reliable sources: Keep up with alerts and warnings from local authorities, the National Weather Service, and other trusted sources. Use radio or mobile alerts if possible.</li>
                  <li>Prepare important documents: Make copies of identification, insurance papers, and medical records, and store them in a waterproof and fireproof container or digitally on cloud storage.</li>
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
