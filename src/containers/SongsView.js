import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class SongsView extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.fetchUserTracks(this.props.token);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.tracks && nextProps.trackIndex) {
      console.log(nextProps.trackIndex)
      let nextTrack = nextProps.tracks.find((track, i) => {
        if (i === nextProps.trackIndex) return track;
      })
      console.log('nex trak is ', nextTrack);
      this.props.audioControls(nextTrack.track.preview_url);
      this.props.setPlayerTrack(nextTrack.track)
      this.props.setAlbumImage(nextTrack.track.album.images[2].url)
    }
    return true;
  }

  setCurrentPlayerTrack = (track) => {
    // Set album image on footer
    if (track.album) {
      this.props.setAlbumImage(track.album.images[2].url)
    }
    // Set track on footer
    this.props.setPlayerTrack(track)
    // play track 
    this.props.audioControls(track.preview_url)
  }

  render() {

    const { tracks } = this.props;
    let trackList;

    if (tracks) {
      trackList = tracks.map((track, idx) => {
        return (
          <div key={track.track.id} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track.track) }}>
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
    tracks: state.userReducer.userTracks,
    trackIndex: state.playerControlsReducer.trackIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex)),
    fetchUserTracks: (token) => dispatch(actionTypes.fetchUserTracks(token)),
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsView);