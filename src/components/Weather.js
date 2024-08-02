import React from 'react';
import './Weather.css';

const Weather = ({ lat, lon, prefecture, selectedCity, icon, main }) => {
  return (
    <div className="weather">
      <div className="today">
        <div className="local">
          <h1 className="prefectureName">{prefecture}</h1>
          <h1 className="cityName">{selectedCity}</h1>
        </div>

        <div className="weather_temp">
          <img
            src={'./Icons/100.svg'}
            // src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            // src={`http://openweathermap.org/img/wn/01d@2x.png`}
            alt="Weather Icon"
          ></img>
          {/* <div>{temp}</div> */}
        </div>
        <h2>{main}</h2>
      </div>
    </div>
  );
};

export default Weather;
