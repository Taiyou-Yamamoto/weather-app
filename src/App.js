import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchCurrentWeather, fetchFiveDaysWeatherDate, fetchPrefecture, fetchCities, fetchCoordinatesFromAddress } from './API/apis';
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
  // 週間のデータ
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  //位置情報
  const [prefecture, setPrefecture] = useState('東京都'); // cityはprefCode
  const [prefecturesList, setPrefecturesList] = useState([]);
  const [city, setCity] = useState(13); // citiesは各都道府県の市町村一覧
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [lat, setLat] = useState('35.6828387');
  const [lng, setLng] = useState('139.7594549');

  
  const loadWeeklyWeather = async (lat, lng) => {
    // 5日間の天気のデータのレスポンスを取得
    const FiveDaysWeatherResponse = await fetchFiveDaysWeatherDate(lat, lng);

    console.log('5DaysWeatherResponse', FiveDaysWeatherResponse);
    const FiveDaysDataList = {};

    FiveDaysWeatherResponse.list.forEach((item) => {
      // 必要なデータだけを取得する
      const dateTime = item.dt_txt;
      const time = dateTime.split(' ')[1];
      const date = dateTime.split(' ')[0];
      const newDate = new Date(date);
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      const monthDay = `${month}/${day}`;

      if (time.startsWith('09:00') || time.startsWith('15:00')) {
        if (!FiveDaysDataList[monthDay]) {
          FiveDaysDataList[monthDay] = {
            '9am': null,
            min: null,
            '15pm': null,
            max: null,
          };
        }
        if (time.startsWith('09:00')) {
          FiveDaysDataList[monthDay]['9am'] = item.weather[0].main;
          FiveDaysDataList[monthDay]['min'] = item.main.temp_min;
        } else if (time.startsWith('15:00')) {
          FiveDaysDataList[monthDay]['15pm'] = item.weather[0].main;
          FiveDaysDataList[monthDay]['max'] = item.main.temp_max;
        }
      }
    });
　
    //日付ごとにデータを分ける
    const weatherSummary = Object.keys(FiveDaysDataList).map((date) => {
      const {
        '9am': morningWeather,
        '15pm': afternoonWeather,
        min,
        max,
      } = FiveDaysDataList[date];

      let weatherDescription;

      switch (true) {
        case morningWeather === 'Clear' && afternoonWeather === 'Clear':
          weatherDescription = '晴れ';
          break;
        case morningWeather === 'Clear' && afternoonWeather === 'Clouds':
          weatherDescription = '晴れ時々曇り';
          break;
        case morningWeather === 'Clouds' && afternoonWeather === 'Clear':
          weatherDescription = '曇り時々晴れ';
          break;
        case morningWeather === 'Clouds' && afternoonWeather === 'Clouds':
          weatherDescription = '曇り';
          break;
        case morningWeather === 'Clear' && afternoonWeather === 'Rain':
          weatherDescription = '晴れ時々雨';
          break;
        case morningWeather === 'Rain' && afternoonWeather === 'Clear':
          weatherDescription = '雨のち晴れ';
          break;
        case morningWeather === 'Rain' && afternoonWeather === 'Rain':
          weatherDescription = '雨';
          break;
        case morningWeather === 'Clouds' && afternoonWeather === 'Rain':
          weatherDescription = '曇り時々雨';
          break;
        case morningWeather === 'Rain' && afternoonWeather === 'Clouds':
          weatherDescription = '雨のち曇り';
          break;
        default:
          weatherDescription = '天気情報なし';
          break;
      }

      return {
        date,
        weatherDescription,
        min,
        max,
      };
    });

    setWeeklyWeather(weatherSummary);
    console.log('weatherSummary', weatherSummary);
  };
  
  const loadCurrentWeatherDate = async (lat, lng) => {
    const res = await fetchCurrentWeather(lat, lng);
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


  const loadPrefectureList = async () => {
    let res = await fetchPrefecture();
    setPrefecturesList(res.result);
    console.log('loadPrefectureList',res.result)
  };



  // 市町村のリストをセット
  const loadCityList = async (city) => {
    let res = await fetchCities(city);
    console.log('Fetched City Data:', res.result);
    setCityList(res.result);
  };


  const loadCoordinates = async (address) => {
    if (!address) {
      console.error('アドレスが設定されていない');
      return;
    }
  
    try {
      const data = await fetchCoordinatesFromAddress(address);
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log('Latitude:', lat);
        console.log('longitude:', lng);
        setLat(lat);
        setLng(lng);
      } else {
        console.error('正しいデータが取れていない', data);
      }
    } catch (error) {
      console.error('コードに問題あり', error);
    }
  };

  // 初回マウント時
  useEffect(() => {
    loadPrefectureList(lat, lng);
    loadCurrentWeatherDate(lat, lng);
    loadWeeklyWeather(lat, lng);
  }, []);

  // 市町村リストが変わった時の処理
  useEffect(() => {
    loadCityList(city);
  }, [city]);

  // 座標が変わった時の処理
  useEffect(() => {
    if (lat && lng) {
      loadCurrentWeatherDate(lat, lng);
      loadWeeklyWeather(lat, lng);
    }
  }, [lat, lng]);

    // 都道府県や市町村が選ばれた時の座標取得
    useEffect(() => {
      if (prefecture && selectedCity) {
        const address = `${selectedCity}, ${prefecture}, 日本`;
        loadCoordinates(address);
      } else if (prefecture) {
        const address = `${prefecture}, 日本`;
        loadCoordinates(address);
      }
    }, [prefecture, selectedCity]);
  return (
    <div className="weather_app">
      <Search
        prefecturesList={prefecturesList}
        setPrefecture={setPrefecture}
        setCity={setCity}
        prefecture={prefecture}
        city={city}
        cityList={cityList}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <Weather
        prefecture={prefecture}
        selectedCity={selectedCity}
        temp={temp}
        icon={icon}
        weather={weather}
        max={max}
        min={min}
        humidity={humidity}
        rain={rain}
        sunrise={sunrise}
        sunset={sunset}
      />
      <Weekly weeklyWeather={weeklyWeather} />
    </div>
  );
}

export default App;