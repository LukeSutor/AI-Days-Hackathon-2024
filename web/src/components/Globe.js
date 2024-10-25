import React from 'react';
import Globe from 'react-globe.gl';
import earth from '../../public/earth.jpg'


const Globe = () => {
    return (
        <div>
            {/* <Globe 
            globeImageUrl="./earth.jpg"/> */}
            <img src={earth} />
        </div>
    );
}