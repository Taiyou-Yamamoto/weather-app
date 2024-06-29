import React from 'react'
import { getAllPrefectures,  getLatAndLon} from "../API/geo&weather-api.js";
import Current from "./Current/Current"
import Weekly from "./Weekly/Weekly"

const Weather = () => {

    return (
        <>
            <Current/>
            <Weekly/>
        </>
    )
}

export default Weather