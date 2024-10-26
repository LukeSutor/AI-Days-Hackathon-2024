import React from 'react'
import { useState } from 'react';

const Navbar = () => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return;

        try {
            // const response = await fetch(`https://api.example.com/search?county=${searchTerm}`);
            // const data = await response.json();
            // console.log(data);
            console.log(`Search for: ${searchTerm}`);
            setSearchTerm('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="navbar bg-black">
            <div className="navbar-start">
                
            </div>
            <div className="navbar-center">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow placeholder-black focus:border-4 focus:border-white"
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
                        className="h-4 w-4 opacity-70"
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
                
            </div>
        </div>
    );
};

export default Navbar;
