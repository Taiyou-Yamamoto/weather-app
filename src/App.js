import React, { useState, useEffect } from 'react';
import './App.css';
// import { getAllPrefectures, getLatAndLon } from './API/geo&weather-api.js';
import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [weater, setWeather] = useState('');
  const [place, setPlace] = useState('東京');
  const [lat, setLat] = useState('35.6828387');
  const [lon, setLon] = useState('139.7594549');
  const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';

  /*位置情報*/
  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      fetch(
        //都市名とその緯度経度を取得
        `http://api.openweathermap.org/geo/1.0/direct?q=Nagoya,JP&appid=${WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  /*位置情報をセット*/
  const loadLocal = async () => {
    let res = await fetchLocation();
    console.log(res[0]);
    setLat(res[0].lat);
    setLon(res[0].lon);
    setPlace(res[0].local_names.ja);
  };

  /*天気情報を取得*/
  const fetchWeather = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const loadWeather = async () => {
    await fetchWeather();
  };

  useEffect(() => {
    loadLocal();
    loadWeather();
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
      <Weather cityName={place} />
    </div>
  );
}

export default App;
