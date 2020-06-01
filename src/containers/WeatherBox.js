import React from "react";
import "./WeatherBox.css";
import {connect} from "react-redux";
import axios from 'axios';
import DayWidget from '../components/dayForecastWidget/dayWidget.js';
import { WindMillLoading } from 'react-loadingg';

const ApiKey = "aaaca138541b803bccef70cb6113141d";

class WeatherBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: props.cityName,
            loading: false,
            errMessage: ""
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dayWidgetClickHandler = this.dayWidgetClickHandler.bind(this);
    }

    inputHandler(event) {
        this.setState({cityName: event.target.value.toUpperCase()});
    }

    handleSubmit() {
        if(!this.state.cityName){
            this.setState({errMessage: "Please Enter City Name"});
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=${ApiKey}`;
        this.setState({loading: true, errMessage: ""});
        axios.get(url)
        .then(res=>{
            this.setState({loading: false}, () => {
                this.props.onGetData(res.data, this.state.cityName);
            });
        })
        .catch(error=>{
            this.setState({
                loading: false, 
                errMessage: ("Not able to find Weather for " + this.state.cityName)},() => {
                    this.props.resetData();
                });
        });
    }

    dayWidgetClickHandler(index) {
        this.props.history.push(`/detail/${index}`);
    }

    render() {
        let forecastDates = this.props.forecastDates || [];
        let forecastDaysData = this.props.forecastDaysData;
        let dayWidgetList = forecastDates.map((date, index) => {
            return <DayWidget 
                        key={date} 
                        tempData={forecastDaysData[date]} 
                        date={date} 
                        onClick={() => {this.dayWidgetClickHandler(index)}} />;
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
                { !this.state.errMessage ? 
                    <div className="day-widget-list">
                        {dayWidgetList}
                    </div>
                    : 
                    <div className="error-message">
                       { this.state.errMessage}
                    </div>
                }
                
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
        cityName: state.cityName,
        forecastDates: state.forecastDates,
        forecastDaysData: state.forecastDaysData,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetData: (data, cityName) => dispatch({type: 'TRANSFORM_WEATHER_DATA', data: data, cityName: cityName}),
        resetData: () => dispatch({type: 'RESET_DATA'}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherBox);