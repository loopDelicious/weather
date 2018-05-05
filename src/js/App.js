import React, { Component } from 'react';
import '../css/App.css';
import Weather from './weather.js';
import secret from './secrets.js';
import Time from './time.js';

class App extends Component {

    state = {
        pic: "https://pixabay.com/get/ea35b8082cf5083ed1584d05fb1d4e9fe275e4d11bac104497f5c47ca7eeb0b0_1280.jpg"
    };

    pixabayKey = secret.pixabayKey;

    componentDidMount = () => {

        fetch(`https://pixabay.com/api/?key=${this.pixabayKey}`).then((response) => {
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
            </div>
          </div>
        );
    }
}

export default App;
