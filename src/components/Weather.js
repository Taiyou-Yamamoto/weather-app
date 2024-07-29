import React from 'react';
import './Weather.css';

const Weather = ({ lat, lon, cityName }) => {
  return (
    <div className="weather">
      <h1 className="cityName">{cityName}</h1>
    </div>
  );
};

export default Weather;
