import React, { Component } from 'react';
import secret from './secrets.js';
import '../css/pics.css';

class Pics extends Component {

    state = {
        photos: []
    };

    componentDidMount() {

        fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${secret.instagramToken}`).then((response) => {
            return response.json();
        }).then((json) => {
            console.log('from api', json);
            this.setState({
                photos: json.data
            });
        });

    };

    render() {

        console.log('before render', this.state.photos);
        let photoCards = this.state.photos.map((photo, index) => {
            return (
                <td className="insta-card" key={index} >
                    <a href={photo.link}>
                        <img className="insta-image" src={photo.images.standard_resolution.url} alt={photo.caption.text} />
                    </a>
                    <div className="insta-likes">
                        <icon className="fas fa-heart" /> {photo.likes.count}
                    </div>

                </td>
            )
        });


        return (
            <div className="pics-feed">
                <table>
                    <tbody>
                        <tr>
                            {photoCards}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Pics;
