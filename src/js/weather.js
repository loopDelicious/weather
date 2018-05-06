import React, { Component } from 'react';
import secret from './secrets.js';
import '../css/weather.css';

class Weather extends Component {

    state = {
        state: "CA",
        city: "San Francisco",
        country: "US",
        forecast: [],
        daysToForecast: 5
    };

    wundergroundKey = secret.wundergroundKey;
    googleKey = secret.googleKey;

    componentDidMount() {

        fetch(`http://api.wunderground.com/api/${this.wundergroundKey}/forecast10day/q/${this.state.state}/${this.state.city}.json`).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                forecast: json.forecast.simpleforecast.forecastday.slice(0, this.state.daysToForecast)
            })
        });
    };

    handleSubmit = (e) => {

        e.preventDefault();
        let query = this.refs.queryInput.value;

        // geocode the input query
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${this.googleKey}`).then((response) => {
            return response.json();
        }).then((json) => {

            let result = json.results[0].formatted_address.split(',');
            console.log(result);
            this.setState({
                state: result[1],
                city: result[0].split(" ").join('_'),
                country: result[2]
            })

        }).then(() => {

            // get the 10 day forecast
            fetch(`http://api.wunderground.com/api/${this.wundergroundKey}/forecast10day/q/${this.state.state}/${this.state.city}.json`).then((response) => {
                return response.json();
            }).then((json) => {
                this.setState({
                    forecast: json.forecast.simpleforecast.forecastday.slice(0, this.state.daysToForecast)
                })
            });
        });

    };

    render() {

        let dayRow = this.state.forecast.map((day, index) => {
            let dayName = day.date.weekday_short;
            let minTemp = day.low.fahrenheit;
            let maxTemp = day.high.fahrenheit;
            let dayDescription = day.conditions;
            let dayIconUrl = `https://icons.wxug.com/i/c/i/${day.icon}.gif`;

            return (
                <li key={index} className="day-card">
                    <a href="#day">
                        <div className="card-contents tooltip">
                            <p>{dayName}</p>
                            <img alt={dayDescription} src={dayIconUrl} />
                        </div>
                        <ul className="temps">
                            <li className="max-temp">{maxTemp}&#176;</li>
                            <li className="min-temp">{minTemp}&#176;</li>
                        </ul>
                    </a>

                </li>
            )
        });

        return (
            this.state.forecast ?
                <div className="weather-box">
                    <h2>5-day forecast for {this.state.city.split("_").join(" ")}</h2>
                    <form className="input-form" onSubmit={this.handleSubmit}>
                        <input className="text-field" type="text" ref="queryInput" value={this.state.value} placeholder="update city" autoFocus />
                        <input className="submit-button" type="submit" value="Submit" />
                    </form>
                    <ul id="horizontal-list">{dayRow}</ul>
                </div>
                    :
                null

        );
    }
}

export default Weather;
