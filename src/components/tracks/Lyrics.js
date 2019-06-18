import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        this.setState({
          lyrics: res.data.message.body.lyrics,
        })

        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      })
      .then(res => {
        this.setState({
          track: res.data.message.body.track,
          isLoaded: true,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const {track, lyrics, isLoaded} = this.state;

    if(isLoaded) {
      return (
        <Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go back</Link>

          <div className="card">
            <h5 className="card-header">
              <strong>{track.track_name}</strong> <em>by</em> <span className="text-secondary">{track.artist_name}</span>
            </h5>

            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group">
            <li className="list-group-item">
              <strong>Album Name:</strong> {track.album_name}
            </li>

            <li className="list-group-item">
              <strong>Explicit Words:</strong> {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
          </ul>
        </Fragment>
      )
    } else {
      return <Spinner />
    }
  }
}

export default Lyrics;