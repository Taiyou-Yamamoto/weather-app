import React, { useState, useEffect } from 'react';

const Card = ({ day }) => {
  const [icon, setIcon] = useState('');
  useEffect(() => {
    switch (day.weatherDescription) {
      case '晴れ':
        setIcon('../../public/Icons/100.svg'); // 晴れのアイコンを設定
        break;
      case '晴れ時々曇り':
        setIcon('../../public/Icons/100.svg'); // 晴れ時々曇りのアイコンを設定
        break;
      case '曇り時々晴れ':
        setIcon('../../public/Icons/100.svg'); // 曇り時々晴れのアイコンを設定
        break;
      case '曇り':
        setIcon('../../public/Icons/100.svg'); // 曇りのアイコンを設定
        break;
      case '晴れ時々雨':
        setIcon('../../public/Icons/100.svg'); // 晴れ時々雨のアイコンを設定
        break;
      case '雨のち晴れ':
        setIcon('../../public/Icons/100.svg'); // 雨のち晴れのアイコンを設定
        break;
      case '雨':
        setIcon('../../public/Icons/100.svg'); // 雨のアイコンを設定
        break;
      case '曇り時々雨':
        setIcon('../../public/Icons/100.svg'); // 曇り時々雨のアイコンを設定
        break;
      case '雨のち曇り':
        setIcon('../../public/Icons/100.svg'); // 雨のち曇りのアイコンを設定
        break;
      default:
        setIcon(''); // 天気情報なしのアイコンを設定
        break;
    }
  }, [day.weatherDescription]);
  return (
    <div className="Card">
      <div className="date">{day.date}</div>
      <div className="icon"></div>
      <div className="">{icon}</div>
      <div className="min">{Math.round(day.min - 273.15)}</div>
      <div className="max">{Math.round(day.max - 273.15)}</div>
    </div>
  );
};

export default Card;
