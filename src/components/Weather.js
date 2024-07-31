import React from 'react';
import './Weather.css';

const Weather = ({ lat, lon, prefecture, selectedCity }) => {
  return (
    <div className="weather">
      <h1 className="cityName">{prefecture}</h1>
      <h1 className="cityName">{selectedCity}</h1>
    </div>
  );
};

export default Weather;
