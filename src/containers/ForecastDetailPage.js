import React from "react";
import "./ForecastDetailPage.css";
import {connect} from "react-redux";
import { WindMillLoading } from 'react-loadingg';
import HourWidget from '../components/hourForecastWidget/hourWidget';
import backButton from "../assets/back-button.png";

class ForecastDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.backHandler = this.backHandler.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false});
        },400);
    }

    backHandler() {
        this.props.history.goBack();
    }

    render() {
        let date = this.props.forecastDates[this.props.match.params.day];
        let forecastHoursData = this.props.forecastHoursData[date]
        let hourWidgetList = forecastHoursData.map((hourData, index) => {
            return <HourWidget 
                        key={index} 
                        hourData={hourData} 
                        totalWidgets={forecastHoursData.length} 
                        index={index}
                        day={this.props.match.params.day}/>;
        });

        return (
            <div className="forecast-detail-Page">
                <div className="heading">
                    <img src={backButton} onClick={this.backHandler}/>
                    {date}
                </div>
                <div className="city-name">
                    {this.props.cityName}
                </div>
                <div className="hour-widget-list">
                    {hourWidgetList}
                </div>
                { this.state.loading ?
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
        forecastHoursData: state.forecastHoursData,
    };
}

export default connect(mapStateToProps)(ForecastDetailPage);