import React, { Component } from 'react';
import secret from './secrets.js';
import '../css/App.css';

class Card extends Component {

    state = {
        zip: '94121',
        country: 'us',
        openWeatherKey: secret.openWeatherKey,
        forecast: []
    };

    componentDidMount = () => {

        const key = this.state.openWeatherKey;
        let zip = this.state.zip + ',' + this.state.country;
        fetch('http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + '&APPID=' + key + '&cnt=5&units=imperial').then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
              forecast: json.list
            })
        })
    };

    render() {

        let dayRow = this.state.forecast.map((day, index) => {
            return (
                <li key={index} className="day-card">
                    <div>
                        <p>placeholder for date</p>
                    </div>
                    <div>
                        <p>placeholder for icon</p>
                    </div>
                    <div className="temps">
                        <p>{day.main.temp_max.toFixed(0)}</p>
                        <p>{day.main.temp_min.toFixed(0)}</p>
                    </div>
                </li>
            )
        });

        return (
            <div className="card">
                {this.state.forecast ?
                    <div>
                        <h2>5-day forecast for {this.state.zip}:</h2>
                        <ul>{dayRow}</ul>
                    </div>
                        :
                    null
                }

            </div>
        );
    }
}

export default Card;
