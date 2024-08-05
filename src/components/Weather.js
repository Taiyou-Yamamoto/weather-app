import React from 'react';
import './Weather.css';

const Weather = ({
  lat,
  lon,
  prefecture,
  selectedCity,
  weather,
  temp,
  max,
  min,
  humidity,
  rain,
  sunrise,
  sunset,
  icon,
  main,
}) => {
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
          <p>{weather}</p>
        </div>

        <div className="current_temp">
          <h1>{temp}°</h1>
          <div className="temps">
            <h2>
              <span>最高</span>
              {max}°
            </h2>
            <h2>
              <span>最低</span>
              {min}°
            </h2>
          </div>
        </div>

        <div className="others">
          <div className="hum_rain">
            <div className="humidity">湿度: {humidity}%</div>
            <div className="rain_1h">降水: {rain}</div>
          </div>

          <div className="sun_data">
            <div className="sunrise_data">
              <div className="sunrise">日の出</div>
              <div className="sunriseTime">{sunrise}</div>
            </div>
            <div className="sunset_data">
              <div className="sunset">日没</div>
              <div className="sunsetTime">{sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
