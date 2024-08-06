import React, { useState, useEffect } from 'react';
import './App.css';
// import { getAllPrefectures, getLatAndlng } from './API/geo&weather-api.js';
import Weather from './components/Weather';
import Search from './components/Search';
import Weekly from './components/Weekly';

function App() {
  // 天気情報
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rain, setRain] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  //位置情報
  const [prefecture, setPrefecture] = useState('東京都'); // cityはprefCode
  const [city, setCity] = useState(13); // citiesは各都道府県の市町村一覧
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [lat, setLat] = useState('35.6828387');
  const [lng, setLng] = useState('139.7594549');

  const [results, setResults] = useState([]);
  const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
  const JAPAN_PREFECTURE_API_KEY = '1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';
  const GOOGLE_API_KEY = 'AIzaSyDfZFLN7K7NX5ee8ZYekYPLpUdzr7bQVBs';

  /*現在の天気情報を取得*/
  const fetchCurrentWeather = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => resolve(data));
    });
  };

  // ５日間の天気情報

  const loadWeeklyWeather = async () => {
    const week = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
    ).then((res) => res.json());
    console.log('week', week);
  };

  const loadCurrentWeather = async () => {
    const res = await fetchCurrentWeather();
    console.log('res', res.weather[0].description);
    // 天気をセット
    switch (res.weather[0].description) {
      case 'clear sky':
        setWeather('快晴');
        setIcon('/Icons/100.svg');
        break;
      case 'few clouds':
      case 'scattered clouds':
        setWeather('晴れ');
        setIcon('/Icons/100.svg');
        break;
      case 'broken clouds':
      case 'overcast clouds':
        setWeather('曇り');
        setIcon('/Icons/200.svg');
        break;
      case 'light rain':
      case 'moderate rain':
        setWeather('雨');
        setIcon('/Icons/300.svg');
        break;
      case 'heavy rain':
      case 'very heavy rain':
      case 'extreme rain':
        setWeather('強い雨');
        setIcon('/Icons/300.svg');
        break;
      case 'freezing rain':
        setWeather('氷雨');
        setIcon('/Icons/300.svg');
        break;
      case 'light snow':
      case 'moderate snow':
        setWeather('雪');
        setIcon('/Icons/400.svg');
        break;
      case 'heavy snow':
      case 'very heavy snow':
      case 'extreme snow':
        setWeather('大雪');
        setIcon('/Icons/400.svg');
        break;
      case 'mist':
        setWeather('霧');
        setIcon('');
        break;
      case 'smoke':
        setWeather('煙');
        setIcon('');
        break;
      case 'haze':
        setWeather('もや');
        setIcon('');
        break;
      case 'fog':
        setWeather('深い霧');
        setIcon('');
        break;
      case 'light thunderstorm':
      case 'thunderstorm':
        setWeather('豪雨');
        setIcon('/Icons/300.svg');
        break;
      case 'heavy thunderstorm':
      case 'severe thunderstorm':
        setWeather('激しい豪雨');
        setIcon('/Icons/300.svg');
        break;
      case 'tornado':
        setWeather('竜巻');
        setIcon('');
        break;
      case 'dust':
        setWeather('塵');
        setIcon('');
        break;
      case 'sand':
        setWeather('砂');
        setIcon('');
        break;
      default:
    }

    // 現在気温
    const current_temp = res.main.temp - 273.15;
    setTemp(Math.round(current_temp));

    // 最高気温
    const current_max_temp = res.main.temp_max - 273.15;
    setMax(Math.round(current_max_temp));

    // 最低気温
    const current_min_temp = res.main.temp_min - 273.15;
    setMin(Math.round(current_min_temp));

    //湿度
    const humidity = res.main.humidity;
    setHumidity(humidity);

    // 降水
    let rain = res.rain ? res.rain['1h'] : 'データなし';
    if (typeof rain === 'number') {
      rain = Math.floor(rain) + 'mm';
      setRain(rain);
    } else {
      setRain(rain);
    }

    // 日の入り
    const unixSunrise = res.sys.sunrise;
    const sunrise_time = new Date(unixSunrise * 1000);
    const sunriseHours = sunrise_time.getHours();
    const sunriseMinutes = sunrise_time.getMinutes();
    const sunriseHM = `${sunriseHours}:${
      sunriseMinutes < 10 ? '0' : ''
    }${sunriseMinutes}`;
    setSunrise(sunriseHM);

    //日没
    const unixSunset = res.sys.sunset;
    const sunset_time = new Date(unixSunset * 1000);
    const sunsetHours = sunset_time.getHours();
    const sunsetMinutes = sunset_time.getMinutes();
    const sunsetHM = `${sunsetHours}:${
      sunsetMinutes < 10 ? '0' : ''
    }${sunsetMinutes}`;
    setSunset(sunsetHM);
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
      console.log('longitude:', lng);
      setLat(lat);
      setLng(lng);
    }
  };

  useEffect(() => {
    loadJp();
    loadCurrentWeather();
    loadWeeklyWeather();
  }, []);

  useEffect(() => {
    loadCity();
    // loadCurrentWeather();
    // loadWeeklyWeather();
  }, [city]);

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
      loadCurrentWeather();
      loadWeeklyWeather();
    }
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
      <Weather
        prefecture={prefecture}
        selectedCity={selectedCity}
        temp={temp}
        icon={icon}
        weather={weather}
        a
        max={max}
        min={min}
        humidity={humidity}
        rain={rain}
        sunrise={sunrise}
        sunset={sunset}
      />
      <Weekly />
    </div>
  );
}

export default App;
