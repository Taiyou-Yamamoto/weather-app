import React from 'react';
import './Weather.css';

const Weather = ({ lat, lon, prefecture, selectedCity, icon, main }) => {
  return (
    <div className="weather">
      <div className="local">
        <h1 className="cityName">{prefecture}</h1>
        <h1 className="cityName">{selectedCity}</h1>
      </div>

      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        // src={`http://openweathermap.org/img/wn/01d@2x.png`}
        alt="Weather Icon"
      ></img>
      <h2>{main}</h2>
    </div>
  );
};

export default Weather;
