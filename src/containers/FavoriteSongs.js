import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class FavoriteSongs extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.fetchUserTracks(this.props.token);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.tracks && nextProps.trackIndex >= 0) {
      let nextTrack = nextProps.tracks.find((track, i) => {
        if (i === nextProps.trackIndex) return track;
      })
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
          <div key={track.track.id}
            className="song-list-title-row"
            onClick={() => {
              this.props.setCurrentTrackIndex(idx);
              this.setCurrentPlayerTrack(track.track)
            }}>
            <p className="song-list-col-5">{track.track.name}</p>
            <p className="song-list-col-5">{track.track.artists[0].name}</p>
            <p className="song-list-col-5">{track.track.album.name}</p>
            <p className="song-list-col-5">{track.added_at}</p>
            <p className="song-list-col-5">{track.track.duration_ms}</p>
          </div>
        )
      })
    }

    return (
      <>
        <div className="song-list-title-row">
          <div className="song-list-col-5">title</div>
          <div className="song-list-col-5">artist</div>
          <div className="song-list-col-5">album</div>
          <div className="song-list-col-5">date</div>
          <div className="song-list-col-5">duration</div>
        </div>
        <div className="song-list">
          {trackList}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteSongs);