import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class RecentlyPlayed extends Component {

  componentDidMount() {
    this.props.fetchRecentlyPlayedTracks(this.props.token);
  }

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
      this.props.setAlbumImage(track.album.images[2].url)
    }
    // Set track on footer
    this.props.audioControls(track.preview_url);
    this.props.setPlayerTrack(track)
  }

  render() {
    const { tracks } = this.props;
    let trackList;

    if (tracks) {
      trackList = tracks.map((track, idx) => {
        return (
          <div key={track.track.id + idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track.track) }}>
            <img src={track.track.album.images[1].url} alt="" />
            <p>{track.track.album.name}</p>
            <p>{track.track.name}</p>
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
    token: state.tokenReducer.token,
    tracks: state.userReducer.recentTracks,
    trackIndex: state.playerControlsReducer.trackIndex,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecentlyPlayedTracks: (token) => dispatch(actionTypes.fetchRecentlyPlayed(token)),
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
    fetchAlbumTracks: (token, playlistId) => dispatch(actionTypes.fetchAlbumTracks(token, playlistId)),
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayed);