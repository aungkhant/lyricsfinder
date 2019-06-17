import React, {Component, Fragment} from 'react';
import {Consumer} from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const {isLoaded, track_list, heading} = value;

          if(isLoaded) {
            return (
              <Fragment>
                <h3 className="text-center mb-4">{heading}</h3>

                <div className="row">
                  {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </Fragment>
            )
          } else {
            return <Spinner />;
          }
        }}
      </Consumer>
    )
  }
}

export default Tracks;
