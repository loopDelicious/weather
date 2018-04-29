import React, { Component } from 'react';
import secret from './secrets.js';
import '../css/card.css';

class Card extends Component {

    state = {
        state: 'CA',
        city: "San_Francisco",
        wundergroundKey: secret.wundergroundKey,
        forecast: []
    };

    componentDidMount = () => {

        const key = this.state.wundergroundKey;
        let state = this.state.state;
        let city = this.state.city;

        fetch('http://api.wunderground.com/api/' + key + '/forecast10day/q/' + state + '/' + city + '.json').then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                forecast: json.forecast.simpleforecast.forecastday.slice(0,5)
            })
        });
    };

    render() {

        console.log(this.state.forecast);
        let dayRow = this.state.forecast.map((day, index) => {
            let dayName = day.date.weekday_short;
            let minTemp = day.low.fahrenheit;
            let maxTemp = day.high.fahrenheit;
            let dayDescription = day.conditions;
            let dayIconUrl = "https://icons.wxug.com/i/c/i/" + day.icon + '.gif';
            let dayTooltip = day.conditions;

            return (
                <li key={index} className="day-card">
                    <a href="#day">
                        <div className="card-contents tooltip">
                            <p>{dayName}</p>
                            <img alt={dayDescription} src={dayIconUrl} />
                            {/*<div className="tooltip">&#9432;*/}
                                <span className="tooltiptext">{dayTooltip}</span>
                            {/*</div>*/}
                        </div>
                        <ul className="temps">
                            <li className="max-temp">{maxTemp}</li>
                            <li className="min-temp">{minTemp}</li>
                        </ul>
                    </a>

                </li>
            )
        });

        return (
            <div className="card">
                {this.state.forecast ?
                    <div>
                        <h2>5-day forecast for {this.state.city}:</h2>
                        <ul id="horizontal-list">{dayRow}</ul>
                    </div>
                        :
                    null
                }

            </div>
        );
    }
}

export default Card;
