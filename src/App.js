import React, { Component } from 'react';
import './App.css';
import WeatherBox from './containers/WeatherBox';
import ForecastDetailPage from './containers/ForecastDetailPage';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={WeatherBox} />
        {this.props.cityName ? 
          <Route path="/detail/:day" component={ForecastDetailPage} /> 
          : ""
        }
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      cityName: state.cityName,
  };
}

export default connect(mapStateToProps)(App);
