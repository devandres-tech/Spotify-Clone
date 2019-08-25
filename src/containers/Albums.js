import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';

class Albums extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Set up the track index in redux store
    if (this.props.tracks && nextProps.trackIndex >= 0) {
      let nextTrack = this.props.tracks.find((track, i) => {
        if (i === nextProps.trackIndex) return track;
      })

      if (nextTrack) {
        this.props.audioControls(nextTrack.track.preview_url);
        this.props.setPlayerTrack(nextTrack.track)
        this.props.setAlbumImage(nextTrack.track.album.images[2].url)
      }

    }
    return true;
  }

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
      trackList = tracks.map((track, idx) => {
        return (
          <div key={track.track.id} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track.track) }}>
            <img src={track.track.album.images.length > 0 ? track.track.album.images[1].url : ''} alt="" />
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
    tracks: state.userReducer.userTracks,
    trackIndex: state.playerControlsReducer.trackIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
