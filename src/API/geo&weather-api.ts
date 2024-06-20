//key
const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
const GEOCODING_API_KEY = 'AIzaSyBcZNaoi8vo01m2cFEpOjEC7ra1lXNnrtU';

//url
const CurrentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
const DailyForecast16Days = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;
const HourlyForecast4days = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}`;


const fetchCurrentWeather = (lat) => {

}