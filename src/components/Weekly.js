import React from 'react';
import weatherIcon from '../components/Icons/100.svg';

const Weekly = () => {
  return (
    <div className="Weekly">
      <img
        src={'weatherIcon'}
        // src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        // src={`http://openweathermap.org/img/wn/01d@2x.png`}
        alt="Weather Icon"
      ></img>
    </div>
  );
};

export default Weekly;
