/* api keys */
const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
//geoは緯度と経度   rasesは都道府県と市町村の獲得
const GEOCODING_API_KEY = 'AIzaSyBcZNaoi8vo01m2cFEpOjEC7ra1lXNnrtU';
const RASES_API_KEY = '1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';


/* URl*/

//weather
const CurrentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
const DailyForecast16Days = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;
const HourlyForecast4days = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}`;
//rases
const rases_URL = `https://opendata.resas-portal.go.jp`;
//geocoding
const geocoding_URL =``;



export const getLatAndLon = (address) => {
    return new Promise((resolve, reject) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODING_API_KEY}`)
        .then((res) => res.json())
        .then((data) => resolve(data));
    })
}

export const getAllPrefectures = () => {
    return new Promise((resolve, reject) => {
        fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            headers: {
                'X-API-KEY': RASES_API_KEY // APIキーをリクエストヘッダーに設定
            }
        })
        .then((res) => res.json())
        .then((data) => resolve(data.result))
        .catch(e => reject(e.message));
    });
}

