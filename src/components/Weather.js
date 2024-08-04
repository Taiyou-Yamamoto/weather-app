import React from 'react';
import './Weather.css';

const Weather = ({ lat, lon, prefecture, selectedCity, icon, main }) => {
  return (
    <div className="weather">
      <div className="local">
        <h1 className="prefectureName">{prefecture}</h1>
        <h1 className="cityName">{selectedCity}</h1>
      </div>

      <div className="today">
        <div className="current_weather">
          <img
            src={'/Icons/100.svg'}
            // src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            // src={`http://openweathermap.org/img/wn/01d@2x.png`}
            alt="Weather Icon"
          ></img>
          <p>晴れ</p>
        </div>

        <div className="current_temp">
          <h1>36°</h1>
          <h2>
            <span>最高</span> 34°
          </h2>
          <h2>
            <span>最低</span> 34°
          </h2>
        </div>

        <div className="others">
          <div className="humidity">70%</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
