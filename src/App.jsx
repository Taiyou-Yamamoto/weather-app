import React, { useEffect }from 'react';
import './App.css';
import { fetchPrefectures } from './API/geo&weather-api.js';
import Weather from "./Weather";



function App() {
  useEffect(() => {
    fetchPrefectures();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
      </header>
      <body><Weather /></body>
    </div>
  );
}

export default App;
