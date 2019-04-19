import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class SongsView extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.fetchUserTracks(this.props.token);
    }
  }

  render() {

    const { tracks } = this.props;
    let trackList;

    if (tracks) {
      trackList = tracks.map((track) => {
        return (
          <div key={track.track.id}>
            {/* <img src={track.images[0].url} alt="" /> */}
            <p>{track.track.album.name}</p>
            <p>{track.track.name}</p>
          </div>
        )
      })
    }

    return (
      <div>
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
    fetchUserTracks: (token) => dispatch(actionTypes.fetchUserTracks(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsView);