import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';

class Albums extends Component {

  setCurrentPlayerTrack = (track) => {
    // Set album image on footer
    if (track.album) {
      this.props.setAlbumImage(track.album.images[2].url);
    }
    // Set track on footer
    this.props.setPlayerTrack(track);
    // play track
    this.props.audioControls(track.preview_url);
  }

  render() {
    const { tracks } = this.props;
    let trackList;
    if (tracks) {
      trackList = tracks.map((track) => {
        return (
          <div key={track.track.id} onClick={() => this.setCurrentPlayerTrack(track.track)}>
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
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
