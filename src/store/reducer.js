const initialState = {
    forecastData: null
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDate = (utc) => {
    var date = new Date(0);
    date.setUTCSeconds(utc);
    let dayName = dayNames[date.getDay()];;
    let day = date.getDate(); 
    let monthName = monthNames[date.getMonth()];
    let year = date.getFullYear();
    
    return `${dayName} ${day}-${monthName}-${year}`;  
}

const getWeather = (weatherTypeCounts) => {
    let max = -1;
    let weatherType = "";
    Object.keys(weatherTypeCounts).map((keys) => {
        if(max < weatherTypeCounts[keys]){
            max = weatherTypeCounts[keys];
            weatherType = keys;
        }
    });
    return weatherType;
}

const getWeatherFromId = (id) => {
    if(id > 800){
        return "Cloudy";
    }else if(id == 800){
        return "Sunny";
    }else if(id >= 701){
        return "Cloudy";
    }else if(id >= 600){
        return "Snow";
    }else if(id >= 200){
        return "Rain";
    }
    return "Sunny";
}

const getForecastDaysData = (forecastHoursData) => {
    let forecastDaysData = {};
    Object.keys(forecastHoursData).forEach(date => {
        let maxTemp = -1000;
        let minTemp = 1000;
        let avgTemp = 0;
        let weatherTypeCounts = {
            Sunny: 0,
            Cloudy: 0,
            Snow: 0,
            Rain: 0
        };
        let weatherName = ""; 
        forecastHoursData[date].forEach(hourData => {
            maxTemp = Math.max(maxTemp, hourData.main.temp_max);
            minTemp = Math.min(minTemp, hourData.main.temp_min);
            avgTemp = avgTemp + hourData.main.temp/forecastHoursData[date].length;
            weatherName = getWeatherFromId(hourData.weather[0].id)
            weatherTypeCounts[weatherName] = weatherTypeCounts[weatherName] + 1;
        });
        maxTemp = Math.floor(maxTemp - 273.15);
        minTemp = Math.floor(minTemp - 273.15);
        avgTemp = Math.floor(avgTemp - 273.15);
        forecastDaysData[date] = {
            maxTemp,
            minTemp,
            avgTemp,
            weatherType: getWeather(weatherTypeCounts)
        }
    });
    return forecastDaysData;
}

const reducer = (state = initialState, action) => {
    if(action.type === 'TRANSFORM_WEATHER_DATA'){
        let forecastHoursData = {};
        let forecastDaysData = {};
        let forecastDates = [];
        let hourForecastList = action.data.list || [];
        let date = "";
        hourForecastList.forEach(hourData => {
            date = getDate(hourData.dt);
            if(!forecastHoursData[date]){
                forecastDates.push(date);
                forecastHoursData[date] = [];
            }
            forecastHoursData[date].push(hourData);
        });
        forecastDaysData = getForecastDaysData(forecastHoursData);

        return {
            forecastDates,
            forecastHoursData,
            forecastDaysData
        }
    }
    return state;
};



export default reducer;