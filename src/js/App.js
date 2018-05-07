import React, { Component } from 'react';
import '../css/App.css';
import Weather from './weather.js';
import secret from './secrets.js';
import Time from './time.js';
import Pics from './pics.js';
import Hacker from './hacker.js';

class App extends Component {

    state = {
        pic: ""
    };

    componentDidMount() {

        fetch(`https://pixabay.com/api/?key=${secret.pixabayKey}`).then((response) => {
            return response.json();
        }).then((json) => {
            let index = Math.floor(Math.random() * json.hits.length);
            this.setState({
                pic: json.hits[index].largeImageURL
            })
        });
    };

    render() {

        let styles = {
            backgroundImage: `url(${this.state.pic})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        };

        return (
          <div className="App" style ={ styles }>
            <div className="layer">
                <Time />
                <Weather />
                <Pics />
                <Hacker />
            </div>
          </div>
        );
    }
}

export default App;
