import React, { useState, useEffect } from 'react';
import './App.css';
// import { getAllPrefectures, getLatAndlng } from './API/geo&weather-api.js';
import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [weather, setWeather] = useState('');
  const [prefecture, setPrefecture] = useState('東京都');
  // cityはprefCode
  const [city, setCity] = useState(13);
  // citiesは各都道府県の市町村一覧
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [lat, setLat] = useState('35.6828387');
  const [lng, setLng] = useState('139.7594549');

  const [results, setResults] = useState([]);
  const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
  const JAPAN_PREFECTURE_API_KEY = '1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';
  const GOOGLE_API_KEY = 'AIzaSyDfZFLN7K7NX5ee8ZYekYPLpUdzr7bQVBs';

  /*天気情報を取得*/
  const fetchWeather = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  const loadWeather = async () => {
    const res = await fetchWeather();
    setWeather(res);
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
  // 指定した住所の緯度経度の取得
  const getLat_lng = async (address) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},日本&key=${GOOGLE_API_KEY}`
    );

    const data = await res.json();
    if (data.status === 'OK' && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      console.log('Latitude:', lat);
      console.log('lnggitude:', lng);
      setLat(lat);
      setLng(lng);
    }
  };

  useEffect(() => {
    loadJp();
    loadWeather();
  }, []);

  useEffect(() => {
    loadCity();
  }, [city]);

  useEffect(() => {}, [lat, lng]);
  useEffect(() => {
    if (prefecture && selectedCity) {
      const address = `${selectedCity}, ${prefecture}, 日本`;
      getLat_lng(address);
    } else if (prefecture && !selectedCity) {
      const address = `${prefecture}, 日本`;
      getLat_lng(address);
    }
  }, [prefecture, selectedCity]);

  useEffect(() => {
    console.log('weather_data', weather); // weather が更新されたときにログを出力
  }, [weather]);

  useEffect(() => {
    if (lat && lng) {
      loadWeather();
    }
    console.log('天気', lat);
    console.log('天気', lng);
  }, [lat, lng]);
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
