/* api keys */
const WEATHER_API_KEY = '91d22dc332a4b066cdd03ba5d6729121';
const JAPAN_PREFECTURE_API_KEY = '1tmrcijtsjNw53VVfGAkkpatfuMac4E9JS4LbF1L';
const GOOGLE_API_KEY = 'AIzaSyDfZFLN7K7NX5ee8ZYekYPLpUdzr7bQVBs';


    /*現在の天気情報をAPIより取得*/
    export const fetchCurrentWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => resolve(data));
        });
    };

  // ５日間の天気情報APIより取得
    export  const fetchFiveDaysWeatherDate = (lat, lng) => {
        return new Promise((resolve, reject) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => resolve(data));
        });
    };

    /* 都道府県を取得*/
        export const fetchPrefecture = () => {
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

        export const fetchCities = (city) => {
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

        // 指定した住所の緯度経度の取得

    export const fetchCoordinatesFromAddress = (address) => {
        return new Promise((resolve, reject) => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address},日本&key=${GOOGLE_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => resolve(data));
        });
    };