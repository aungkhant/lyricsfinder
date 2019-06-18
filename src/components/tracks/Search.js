import React, {Component} from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

class Search extends Component {
  state = {
    trackTitle: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (dispatch, e) => {
    e.preventDefault();

    // clear tracks
    dispatch({
      type: 'CLEAR_TRACKS',
    })

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card mb-4">
              <div className="card-body p-4">
                <h1 className="display-4 text-center">
                  <i className="fas fa-music"></i> Search For A Song
                </h1>

                <p className="lead text-center">Get the lyrics for any song</p>

                <form onSubmit={this.handleSubmit.bind(this, value.dispatch)}>
                  <div className="form-group">
                    <input 
                      className="form-control form-control-lg" 
                      placeholder="Song title..." 
                      name="trackTitle"
                      value={this.state.trackTitle}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search;