import React from 'react';
import { useState } from 'react';

const Navbar = ({ onMenuItemSelect }) => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return;

        try {
            // Fetch data here
            console.log(`Search for: ${searchTerm}`);
            setSearchTerm('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="navbar bg-black bg-opacity-50 fixed top-0 left-0 w-full z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* <ul
                        tabIndex={0}
                        className="menu menu-vertical lg:menu-horizontal bg-transparent text-white text-lg">
                        <li><a onClick={() => onMenuItemSelect('General Tips')}>General Tips</a></li>
                        <li><a onClick={() => onMenuItemSelect('Resources')}>Resources</a></li>
                        <li><a onClick={() => onMenuItemSelect('After the incident')}>Assistance After a Disaster</a></li>
                    </ul> */}
                    <ul className="menu menu-horizontal bg-transparent text-white">
                        <li>
                            <details close>
                            <summary>General Disaster Information</summary>
                            <ul className='menu menu-horizontal border border-white bg-transparent text-white w-fit'>
                                <li><a onClick={() => onMenuItemSelect('How a Disaster Gets Declared')}>How a Disaster Gets Declared</a></li>
                                <li><a onClick={() => onMenuItemSelect('Disaster Authorities')}>Disaster Authorities</a></li>
                                <li><a onClick={() => onMenuItemSelect('Historic Disasters')}>Historic Disasters</a></li>
                            </ul>
                            </details>
                        </li>
                        <li>
                            <details close>
                            <summary>Tools to Recover</summary>
                            <ul className='menu menu-horizontal border border-white bg-transparent text-white w-fit'>
                                <li><a onClick={() => onMenuItemSelect('Common Rumors')}>Common Rumors</a></li>
                                <li><a onClick={() => onMenuItemSelect('Save Your Family Treasures')}>Submenu 2</a></li>
                                <li><a onClick={() => onMenuItemSelect('Volunteer and Donate')}>Volunteer and Donate</a></li>
                            </ul>
                            </details>
                        </li>
                        <li>
                            <details close>
                            <summary>Assistance After a Disaster</summary>
                            <ul className='menu menu-horizontal border border-white bg-transparent text-white w-fit'>
                                <li><a onClick={() => onMenuItemSelect('Governments and Private Non-Profits')}>Governments and Private Non-Profits</a></li>
                                <li><a onClick={() => onMenuItemSelect('Individuals and Families')}>Individuals and Families</a></li>
                            </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <label className="input input-bordered flex items-center gap-2 focus:border-4 focus:border-blue-500">
                    <input
                        type="text"
                        className="grow placeholder-black text-black bg-transparent"
                        placeholder="Search County"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = 'Search County'}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="black"
                        className="h-4 w-4 opacity-70 cursor-pointer"
                        onClick={handleSearch}
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
