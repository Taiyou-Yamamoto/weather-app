import React, { useState, useEffect } from 'react';
import './App.css';
// import { getAllPrefectures, getLatAndLon } from './API/geo&weather-api.js';
import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [weater, setWeather] = useState('');
  const [place, setPlace] = useState();

  //位置情報
  const getLocation = () => {
    const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
    return new Promise((resolve, reject) => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=Tokyo,JP&appid=${WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const loadLocal = async () => {
    await getLocation();
  };
  //天気情報
  // const weatherForecast = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   });
  // };

  useEffect(() => {
    loadLocal();
  }, []);
  // useEffect(() => {
  //   const fetchPreData = async () => {
  //     let data = await getAllPrefectures();
  //     console.log(data);
  //   };

  //   const address = '東京都八王子';
  //   let fetchPlace = async () => {
  //     let data = await getLatAndLon(address);
  //     console.log(data);
  //   };

  //   fetchPlace();
  //   fetchPreData();
  // }, []);

  return (
    <div className="weather_app">
      <Search />
      <Weather />
    </div>
  );
}

export default App;
