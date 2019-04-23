import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';

class Albums extends Component {

  render() {
    const { tracks } = this.props;
    let trackList;
    if (tracks) {
      trackList = tracks.map((track) => {
        console.log('tracks is ', track)
        return (
          <div key={track.track.id}>
            <img src={track.track.album.images[1].url} alt="" />
            <p>{track.track.album.name}</p>
            <p>{track.track.album.artists[0].name}</p>
          </div>
        )
      })
    }

    return (
      <div className="browse-container">
        {trackList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.userReducer.userTracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserAlbums: (token) => dispatch(actionTypes.fetchUserAlbums(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
