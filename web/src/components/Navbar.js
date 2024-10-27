// Navbar.js
import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ onMenuItemSelect, counties, onCountySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const stateMap = {
    "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
    "09": "CT", "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI",
    "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
    "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
    "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
    "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
    "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
    "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
    "54": "WV", "55": "WI", "56": "WY", "72": "PR"
  };
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = counties.filter((county) => {
          const countyName = county.properties.NAME
            ? county.properties.NAME.toLowerCase()
            : '';
          const stateFP = county.properties.STATEFP;
          const stateAbbr = stateMap[stateFP] ? stateMap[stateFP].toLowerCase() : '';
          return (
            countyName.includes(lowerCaseSearchTerm) ||
            stateAbbr.includes(lowerCaseSearchTerm)
          );
        });
        setSearchResults(results.slice(0, 10)); // Limit to top 10 results
      } else {
        setSearchResults([]);
      }
    }, 300); // Delay of 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, counties]);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current &&
        !Object.values(dropdownRefs.current).some((ref) =>
          ref.contains(event.target)
        )
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dropdown data
  const menus = [
    {
      title: 'General Disaster Information',
      items: [
        'How a Disaster Gets Declared',
        'Disaster Authorities',
        'Historic Disasters',
      ],
    },
    {
      title: 'Tools to Recover',
      items: [
        'Common Rumors',
        'Save Your Family Treasures',
        'Volunteer and Donate',
      ],
    },
    {
      title: 'Assistance After a Disaster',
      items: [
        'Governments and Private Non-Profits',
        'Individuals and Families',
      ],
    },
  ];

  return (
    <div className="navbar bg-black bg-opacity-20 fixed top-0 left-0 w-full z-10 border-b border-white">
      <div className="navbar-start">
        <div className="flex space-x-5">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative"
              ref={(el) => (dropdownRefs.current[index] = el)}
            >
              <button
                className="text-white text-md px-3 py-2 rounded-md text-md font-medium hover:bg-white hover:bg-opacity-20 focus:outline-none"
                onClick={() => toggleDropdown(index)}
                aria-haspopup="true"
                aria-expanded={openDropdown === index}
              >
                {menu.title}
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 bg-white bg-opacity-90 text-black rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                  openDropdown === index
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
                style={{ width: '300px' }}
              >
                <ul className="flex flex-col bg-white text-black bg-opacity-30 text-black">
                  {menu.items.map((item, idx) => (
                    <li key={idx} className="border-b last:border-b-2 border-black g-white bg-opacity-10">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-white hover:bg-opacity-100"
                        onClick={() => {
                          onMenuItemSelect(item);
                          setOpenDropdown(null);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="navbar-center relative">
        <label className="input input-bordered flex items-center gap-2 border-2 border-black hover:border-blue-500 bg-white bg-opacity-90">
          <input
            type="text"
            className="grow placeholder-black text-black bg-transparent"
            placeholder="Search County"
            value={searchTerm}
            onChange={handleSearchTermChange}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'Search County')}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-90 cursor-pointer"
            aria-label="Search"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {/* Search Suggestions Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-black rounded-md shadow-lg z-10">
            <ul className="max-h-60 overflow-y-auto">
              {searchResults.map((county, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-500 cursor-pointer"
                  onClick={() => {
                    onCountySelect(county);
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                >
                  {county.properties.NAME}, {stateMap[county.properties.STATEFP]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-end">
        {/* Add any additional navbar items here */}
      </div>
    </div>
  );
};

export default Navbar;
