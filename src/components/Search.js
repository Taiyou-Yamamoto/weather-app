import React from 'react';
import './Search.css';

const Search = ({
  results,
  setPrefecture,
  setCity,
  prefecture,
  cities,
  selectedCity,
  setSelectedCity,
}) => {
  const changePrefAndCity = (e) => {
    const prefectureName = e.target.value;
    setPrefecture(prefectureName);

    const found = results.find((result) => result.prefName === prefectureName);
    setCity(found.prefCode);
  };

  const changeSelectedCity = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    // setSelectedCity('');
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
          {results.length > 0 ? (
            results.map((result) => {
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
          className="cities"
          value={selectedCity}
          onChange={changeSelectedCity}
        >
          <option value="" disabled>
            市町村を選択
          </option>
          {cities.length > 0 ? (
            cities.map((result) => {
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
