import React from "react";
import "./WeatherBox.css";
import {connect} from "react-redux";
import axios from 'axios';
import DayWidget from '../components/dayForecastWidget/dayWidget.js';
import { WindMillLoading } from 'react-loadingg';

const ApiKey = "aaaca138541b803bccef70cb6113141d";

class WeatherBox extends React.Component {
    constructor() {
        super();
        this.state = {
            cityName: "",
            loading: false
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    inputHandler(event) {
        this.setState({cityName: event.target.value.toUpperCase()});
    }

    handleSubmit(){
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=${ApiKey}`;
        this.setState({loading: true});
        axios.get(url)
        .then(res=>{
            this.setState({loading: false}, () => {
                this.props.onGetData(res.data);
            });
        })
        .catch(error=>{
            this.setState({loading: false});
            console.log(error);
        });
    }

    render() {
        let forecastDates = this.props.forecastDates || [];
        let forecastDaysData = this.props.forecastDaysData;
        let dayWidgetList = forecastDates.map((date) => {
            return <DayWidget key={date} tempData={forecastDaysData[date]} date={date}/>
        });
        
        return (
            <div className="weather-box">
                <div className="heading">
                    Weather App
                </div>
                <div className="city-input">
                    <div className="input-box">
                        <input placeholder="City Name" autoComplete="off" value={this.state.cityName} onChange={this.inputHandler}/>
                    </div>
                    <div className="submit-button">
                        <button onClick={this.handleSubmit}>Get Weather</button>
                    </div>
                </div>
                <div className="day-widget-list">
                    {dayWidgetList}
                </div>
                {this.state.loading ?
                    <div className="loader">
                        <WindMillLoading color="#95888b" size="large"/> 
                    </div>             
                    : ""
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        forecastDates: state.forecastDates,
        forecastDaysData: state.forecastDaysData,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetData: (data) => dispatch({type: 'TRANSFORM_WEATHER_DATA', data: data})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBox);