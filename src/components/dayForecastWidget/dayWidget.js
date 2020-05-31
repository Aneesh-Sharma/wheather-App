import React from "react";
import "./dayWidget.css";
import { Sunny, Cloudy, Rain, Snow } from 'weather-styled-icon';

const getWeatherImage = (weather) => {
    switch(weather){
        case "Sunny": return <Sunny/>;
        case "Cloudy": return <Cloudy/>;
        case "Rain": return <Rain/>;
        case "Snow": return <Snow/>;
        default: return <Sunny/>;
    }
}

const DayWidget = props => {
    let weatherImage = getWeatherImage(props.tempData.weatherType);
    return (
        <div className="dayWidget">
            <div className="date">
               {props.date}
            </div>
            <div className="curr-temp">
                {props.tempData.avgTemp}&deg;<sup>c</sup>
            </div>
            <div className="weather-img">
                {weatherImage}
            </div>
            <div className="temp-range">
                <div  className="min-temp">
                    Min: {props.tempData.minTemp}&deg;<sup>c</sup>
                </div> 
                <div  className="max-temp">
                    Max: {props.tempData.maxTemp}&deg;<sup>c</sup>
                </div>
            </div>
        </div>
    );
}

export default DayWidget;