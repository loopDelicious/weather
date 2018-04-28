import React, { Component } from 'react';
import secret from './secrets.js';
import '../css/card.css';

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
        fetch('http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + '&APPID=' + key + '&units=imperial').then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
              forecast: json.list
            })
        });
    };

    render() {


        console.log(this.state.forecast.length);
        let dayRow = this.state.forecast.map((day, index) => {

            let dayName = new Date(day.dt_txt.split(' ')[0]).toString().split(' ')[0];
            let dayIconUrl = 'http://openweathermap.org/img/w/' + day.weather[0].icon + '.png';
            let dayDescription = day.weather[0].description;
            let minTemp = day.main.temp_min.toFixed(0);
            let maxTemp = day.main.temp_max.toFixed(0);

            return (
                <li key={index} className="day-card">
                    <a href="#day">
                        <div>
                            <p>{dayName}</p>
                        </div>
                        <div>
                            <img alt={dayDescription} src={dayIconUrl} />
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
                        <h2>5-day forecast for {this.state.zip}:</h2>
                        <div className="table">
                            <ul id="horizontal-list">{dayRow}</ul>
                        </div>
                    </div>
                        :
                    null
                }

            </div>
        );
    }
}

export default Card;
