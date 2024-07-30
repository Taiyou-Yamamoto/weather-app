import React from 'react';
import './Search.css';

const Search = ({ results }) => {
  return (
    <>
      <div className="select-box">
        <select className="prefectures">
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

        <select className="cities">
          <option value="" disabled>
            地町村を選択
          </option>
          <option value="項目1">なし</option>
        </select>
      </div>
    </>
  );
};

export default Search;
