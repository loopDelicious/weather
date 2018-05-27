import React, { Component } from 'react';
import '../css/medium.css';
import secret from './secrets.js';

class Medium extends Component {

    state = {
        hackerhunt: ""
    };

    componentDidMount() {

        fetch(`https://api.medium.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${secret.mediumIntegrationToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        }).then((response) => {
            console.log(response);
        })

        // fetch('https://api.medium.com/v1/me', {
        //     method: 'get',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }).then((response) => {
        //     console.log(response);
        //     return response.json();
        // }).then((json) => {
        //     console.log(json);
        //     this.setState({
        //         hackerhunt: json
        //     });
        // });
    };

    render() {
        return (
            <div>Medium</div>
        )
    };
}

export default Medium;
