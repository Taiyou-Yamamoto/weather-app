import React from 'react';
import './Weekly.css';
import Card from './Card';

const Weekly = ({ weeklyWeather }) => {
  console.log('weekly', weeklyWeather);
  const weatherToDisplay = weeklyWeather.slice(1, 5);
  return (
    <div className="Weekly">
      <div className="weeklyContent">
        {weatherToDisplay.map((day, index) => {
          return <Card key={index} day={day} />;
        })}
      </div>
    </div>
  );
};

export default Weekly;
