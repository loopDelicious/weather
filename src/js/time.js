import React, { Component } from 'react';
import '../css/time.css';

class Time extends Component {

    constructor(props) {

        super(props);
        this.state = {
            date: new Date().toLocaleString(),
            time: new Date().toLocaleString()
        };

    };

    componentDidMount() {

        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );

    };

    componentWillUnmount() {

        clearInterval(this.intervalID);

    };

    tick() {

        const dateOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        const timeOptions = {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        this.setState({
            date: (new Date().toLocaleString('en-US', dateOptions)).split(",").join(" "),
            time: (new Date().toLocaleString('en-US', timeOptions)).split(",").join(" ")
        });
    }

    render() {
        return (
            <div className="time-card">

                <div className="time">{this.state.time}</div>
                <div className="date">{this.state.date}</div>

            </div>
        )
    }
}

export default Time;
