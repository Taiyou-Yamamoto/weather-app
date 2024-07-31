import React, { useState, useEffect } from 'react';
import './App.css';
// import { getAllPrefectures, getLatAndLon } from './API/geo&weather-api.js';
import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [weater, setWeather] = useState('');
  const [prefecture, setPrefecture] = useState('東京都');
  // cityはprefCode
  const [city, setCity] = useState(13);
  // citiesは各都道府県の市町村一覧
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [lat, setLat] = useState('35.6828387');
  const [lon, setLon] = useState('139.7594549');

  const [results, setResults] = useState([]);
  const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
  const JAPAN_PREFECTURE_API_KEY = '1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';
  const GOOGLE_API_KEY = 'AIzaSyDfZFLN7K7NX5ee8ZYekYPLpUdzr7bQVBs';

  // /*位置情報*/
  // const fetchLocation = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       //都市名とその緯度経度を取得
  //       // `http://api.openweathermap.org/geo/1.0/direct?q=${prefecture},JP&appid=${WEATHER_API_KEY}`
  //       `http://api.openweathermap.org/geo/1.0/direct?q=${prefecture},JP&appid=${WEATHER_API_KEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => resolve(data));
  //   });
  // };

  // /*位置情報をセット*/
  // const loadLocal = async () => {
  //   let res = await fetchLocation();
  //   console.log(res[0]);
  //   setLat(res[0].lat);
  //   setLon(res[0].lon);
  //   setPrefecture(res[0].local_names.ja);
  // };

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

  /* 都道府県を取得*/
  const fetchPrefecture = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
        method: 'GET',
        headers: {
          'X-API-KEY': `${JAPAN_PREFECTURE_API_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const loadJp = async () => {
    let res = await fetchPrefecture();
    setResults(res.result);
  };

  /** 市町村を取得 */
  const fetchCities = () => {
    return new Promise((resolve, reject) => {
      if (city) {
        fetch(
          `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${city}`,
          {
            method: 'GET',
            headers: {
              'X-API-KEY': `${JAPAN_PREFECTURE_API_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => resolve(data));
      }
    });
  };

  const loadCity = async () => {
    let res = await fetchCities();
    console.log('Fetched City Data:', res);
    setCities(res.result);
  };
  // 市町村のリセット

  // const response = ()await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${prefecture},日本&key=${GOOGLE_API_KEY}`);

  useEffect(() => {
    // loadLocal();
    loadWeather();
    loadJp();
  }, []);

  useEffect(() => {
    loadCity();
  }, [city]);

  return (
    <div className="weather_app">
      <Search
        results={results}
        setPrefecture={setPrefecture}
        setCity={setCity}
        prefecture={prefecture}
        city={city}
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <Weather prefecture={prefecture} selectedCity={selectedCity} />
    </div>
  );
}

export default App;
