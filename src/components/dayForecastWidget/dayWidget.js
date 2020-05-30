import React from "react";
import "./dayWidget.css";
import { Sunny, Cloudy, Rain, Snow } from 'weather-styled-icon';

const DayWidget = props => {
    return (
        <div className="dayWidget">
            <div className="date">
                Fri 29-June-2020
            </div>
            <div className="curr-temp">
                23&deg;<sup>c</sup>
            </div>
            <div className="weather-img">
                <Rain />
            </div>
            <div className="temp-range">
                <div  className="min-temp">
                    Min: 19&deg;<sup>c</sup>
                </div> 
                <div  className="max-temp">
                    Max:30&deg;<sup>c</sup>
                </div>
            </div>
        </div>
    );
}

export default DayWidget;