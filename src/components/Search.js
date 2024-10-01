import React from 'react';
import './Search.css';

const Search = ({
  prefecturesList,
  setPrefecture,
  setCity,
  prefecture,
  cityList,
  selectedCity,
  setSelectedCity,
}) => {
  const changePrefAndCity = (e) => {
    const prefectureName = e.target.value;
    setPrefecture(prefectureName);

    const found = prefecturesList.find((result) => result.prefName === prefectureName);
    setCity(found.prefCode);
    setSelectedCity('');
  };

  const changeSelectedCity = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  };

  return (
    <>
      <div className="select-box">
        <select
          className="prefectures"
          value={prefecture}
          onChange={changePrefAndCity}
        >
          <option value="" disabled>
            都道府県を選択
          </option>
          {prefecturesList.length > 0 ? (
            prefecturesList.map((result) => {
              return (
                <option key={result.prefCode} value={result.prefName}>
                  {result.prefName}
                </option>
              );
            })
          ) : (
            <option value="">データを取得中...</option>
          )}
        </select>

        <select
          className="cityList"
          value={selectedCity}
          onChange={changeSelectedCity}
        >
          <option value="" disabled>
            市町村を選択
          </option>
          {cityList.length > 0 ? (
            cityList.map((result) => {
              return (
                <option key={result.cityCode} value={result.cityName}>
                  {result.cityName}
                </option>
              );
            })
          ) : (
            <option value=""></option>
          )}
        </select>
      </div>
    </>
  );
};

export default Search;
