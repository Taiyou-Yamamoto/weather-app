import React from 'react'
import { getAllPrefectures,  getLatAndLon} from "../API/geo&weather-api.js";
import Current from "./Current/Current"
import Weekly from "./Weekly/Weekly"

const Weather = () => {
    
    getAllPrefectures();

    const address = '東京都八王子'
    getLatAndLon(address);
    return (
        <>
            <Current/>
            <Weekly/>
        </>
    )
}

export default Weather