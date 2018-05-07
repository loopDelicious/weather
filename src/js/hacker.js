import React, { Component } from 'react';
import '../css/hacker.css';

class Hacker extends Component {

    state = {
        hackerhunt: ""
    };

    componentDidMount() {

        fetch('https://hackerhunt.co/api/daily/1', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                hackerhunt: json
            });
        });
    };

    render() {
        return (
            <div>HI</div>
        )
    };
}

export default Hacker;
