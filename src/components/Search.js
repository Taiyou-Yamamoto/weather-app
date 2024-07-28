import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <>
      <div className="select-box">
        <select className="prefectures">
          <option value="" disabled>
            都道府県を選択
          </option>
          <option value="項目1">東京</option>
          <option value="項目2">項目2</option>
          <option value="項目3">項目3</option>
        </select>

        <select className="cities">
          <option value="" disabled>
            地町村を選択
          </option>
          <option value="項目1">目黒</option>
          <option value="項目2">項目2</option>
          <option value="項目3">項目3</option>
        </select>
      </div>
    </>
  );
};

export default Search;
