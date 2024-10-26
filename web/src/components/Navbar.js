// Navbar.js
import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ onMenuItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    try {
      // Implement search functionality here
      console.log(`Search for: ${searchTerm}`);
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    <div className="navbar bg-black bg-opacity-50 fixed top-0 left-0 w-full z-10">
      <div className="navbar-start">
        <div className="flex space-x-5">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative"
              ref={(el) => (dropdownRefs.current[index] = el)}
            >
              <button
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none"
                onClick={() => toggleDropdown(index)}
                aria-haspopup="true"
                aria-expanded={openDropdown === index}
              >
                {menu.title}
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                  openDropdown === index
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
                style={{ width: '300px' }}
              >
                <ul className="flex flex-col bg-white text-black">
                  {menu.items.map((item, idx) => (
                    <li key={idx} className="border-b last:border-b-0">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
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
      <div className="navbar-center">
        <label className="input input-bordered flex items-center gap-2 focus:border-4 focus:border-blue-500">
          <input
            type="text"
            className="grow placeholder-gray-500 text-black bg-transparent"
            placeholder="Search County"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = 'Search County')}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70 cursor-pointer"
            onClick={handleSearch}
            aria-label="Search"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="navbar-end">
        {/* Add any additional navbar items here */}
      </div>
    </div>
  );
};

export default Navbar;
