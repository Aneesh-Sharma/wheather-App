import React from "react";
import "./hourWidget.css";
import WeatherIcon from 'react-icons-weather';

class HourWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false     
        }
        this.timeRange = {
            0: "12am - 3am",
            1: "3am - 6am",
            2: "6am - 9am",
            3: "9am - 12pm",
            4: "12pm - 3pm",
            5: "3pm - 6pm",
            6: "6pm - 9pm",
            7: "9pm - 12am"
        };
        this.viewClickHandler = this.viewClickHandler.bind(this);
    }

    viewClickHandler() {
        this.setState({showDetail: !this.state.showDetail});
    }

    render() {
        let hourData = this.props.hourData || {};
        let mainData = hourData.main || {};
        let rain = hourData.rain || {};
        let clouds = hourData.clouds || {};
        let wind = hourData.wind || {};
        let weather = hourData.weather[0] || {};
        let temp = mainData.temp ? Math.floor(mainData.temp - 273.15) : '-';
        let tempMin = mainData.temp_min ? Math.floor(mainData.temp_min - 273.15) : '-';
        let tempMax = mainData.temp_max ? Math.floor(mainData.temp_max - 273.15) : '-';
        let index = this.props.index;
        index = index + (this.props.day == 0 ? (8 - this.props.totalWidgets) : 0);
        let timeRange = this.timeRange[index];
        return (
            <div className="hourWidget">
                <div className="hr-flex">
                    <div className="hr-time-range">
                       {timeRange}
                    </div>
                    <div className="hr-temp">
                        {temp}&deg;<sup>c</sup>
                    </div>
                    <div className="hr-image">
                        <div className="hr-weather-image">
                            <WeatherIcon name="owm" iconId={(weather.id).toString() || "800"} flip="horizontal" rotate="90" />
                        </div>
                        <div className="hr-weather-name">
                            {weather.description || 'clear'}
                        </div>
                    </div>
                </div>
                <div className="hr-temp-range">
                    <div  className="hr-min-temp">
                        Min: {tempMin}&deg;<sup>c</sup>
                    </div> 
                    <div  className="hr-max-temp">
                        Max: {tempMax}&deg;<sup>c</sup>
                    </div>
                </div>
                <div className="hr-flex">
                    <div className="hr-humidity">
                        Humidity: {mainData.humidity}%
                    </div>
                    <div className="hr-rain">
                        Rain: {rain['3h'] || '0'}mm
                    </div>
                </div>
                <div className={"hr-detail" + (!this.state.showDetail ? " no-display": "")}>
                    <div className="hr-flex">
                        <div className="hr-pressure">
                            Pressure: {mainData.pressure || '-'}hPa
                        </div>
                        <div className="hr-sea_level">
                            Sea level: {mainData.sea_level || '-'}hPa
                        </div>
                    </div>
                    <div className="hr-flex">
                        <div className="hr-wind">
                            Wind Speed: {wind.speed || '-'}km/hr
                        </div>
                        <div className="hr-wind-deg">
                            Wind deg: {wind.deg || '-'}
                        </div>
                    </div> 
                    <div className="hr-flex">
                        <div className="hr-clouds">
                            Cloudiness: {clouds.all || '-'}%
                        </div>
                        <div className="hr-ground-level">
                            Ground level: {mainData.grnd_level || '-'}hPa
                        </div>
                    </div>
                </div> 
                <div className="view-more" onClick={this.viewClickHandler}>
                    View {this.state.showDetail ? "Less" : "More"}
                </div>
            </div>
        );
    }
}

export default HourWidget;