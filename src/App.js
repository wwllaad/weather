import React, { Component } from "react";
import "./App.css";

const PLACES = [
    { name: "Sevastopol", zip: "694423" },
    { name: "Moscow", zip: "524901" },
    { name: "New York", zip: "5128638" },
    { name: "Beijing", zip: "2038349" }
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }
    componentDidMount() {
        const zip = this.props.zip;
        const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
            zip +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=Metric";
        // const URL = "http://localhost:8080/test"
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
        });
    }
    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description} />
                </h1>
                <p>Current: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
                {/*<h1>{weatherData.id}</h1>*/}
                {/*<h2>{weatherData.name}</h2>*/}
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }
    render() {
        const activePlace = this.state.activePlace;
        return (
            <div className="App">
                {PLACES.map((place, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            this.setState({ activePlace: index });
                        }}
                    >
                        {place.name}
                    </button>
                ))}
                <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </div>
        );
    }
}

export default App;