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

  const [results, setResults] = useState([]);
  const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
  const JAPAN_LOCAL_API_KEY = '	1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';

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

  const fetchJp = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
        method: 'GET',
        headers: {
          'X-API-KEY': `${JAPAN_LOCAL_API_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const loadJp = async () => {
    let res = await fetchJp();
    console.log('Fetched JP Data:', res);
    setResults(res.result);
  };

  useEffect(() => {
    loadLocal();
    loadWeather();
    loadJp();
  }, []);

  useEffect(() => {
    console.log('Results updated:', results);
  }, [results]);

  return (
    <div className="weather_app">
      <Search results={results} />
      <Weather cityName={place} />
    </div>
  );
}

export default App;
