import React, { useEffect }from 'react';
import './App.css';
import { getAllPrefectures, getLatAndLon } from './API/geo&weather-api.js';
import Weather from "./Weather/Weather";
import Navbar from "./Navbar/Navbar";




function App() {
  useEffect(() => {
    const fetchPreData = async() => {
      let data = await getAllPrefectures();
      console.log(data);
    };

    const address = '東京都八王子'
    let fetchPlace = async() => {
      let data = await getLatAndLon(address);
      console.log(data);
    }

    fetchPlace();
    fetchPreData();
  }, []);

  return (
    <>
      <Navbar/>
      <Weather />
    </>
  );
}

export default App;
