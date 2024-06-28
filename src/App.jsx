import React, { useEffect }from 'react';
import './App.css';
import { getAllPrefectures } from './API/geo&weather-api.js';
import Weather from "./Weather/Weather";
import Navbar from "./Navbar/Navbar";




function App() {
  useEffect(() => {
    getAllPrefectures();
  }, []);

  return (
    <>
      <Navbar/>
      <Weather />
    </>
  );
}

export default App;
