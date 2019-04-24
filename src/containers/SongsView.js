import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class SongsView extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.fetchUserTracks(this.props.token);
    }
  }

  setCurrentPlayerTrack = (track) => {
    // Set album image on footer
    if (track.album) {
      this.props.setAlbumImage(track.album.images[2].url)
    }
    // Set track on footer
    this.props.setPlayerTrack(track)
  }

  render() {

    const { tracks } = this.props;
    let trackList;

    if (tracks) {
      trackList = tracks.map((track) => {
        return (
          <div key={track.track.id} onClick={() => this.setCurrentPlayerTrack(track.track)}>
            <p>{track.track.album.name}</p>
            <p>{track.track.name}</p>
          </div>
        )
      })
    }

    return (
      <div className="song-list">
        {trackList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    tracks: state.userReducer.userTracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTracks: (token) => dispatch(actionTypes.fetchUserTracks(token)),
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsView);