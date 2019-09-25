import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';
import LeftSideMenu from '../components/LeftSideMenu';
import Footer from '../components/Footer';
import MainView from '../components/MainView';
import TopHeader from '../components/Header';

class App extends Component {

  static audioTrack;
  /* When component mounts request authorization */
  componentDidMount() {
    const clientId = '40fee03a615b470c8c8f73a02a634dcc';
    const URI = 'http://localhost:3000/callback/';
    // scopes
    const scopes = `user-read-private%20user-read-email%20playlist-read-private%20user-
    library-read%20user-follow-read%20user-top-read%20user-read-currently-playing%20user-read-recently-played`
    let accessToken;
    if (window.location.hash.length === 0) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&response_type=token&redirect_uri=${URI}`
    } else {
      accessToken = window.location.hash.split('=')[1].split('&')[0];
      this.props.setToken(accessToken);
      this.props.fetchUserPlaylists(accessToken);
      this.props.fetchUserProfile(accessToken);
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    // Set the volume in our audio element when our volume props updates
    if (prevProps.volume && this.audioTrack) {
      this.audioTrack.volume = prevProps.volume / 100;
    }
  }

  getCurrentTime = () => {
    // set current playback time
    this.props.setCurrentTime(~~this.audioTrack.currentTime);
  }

  playTrack = () => {
    this.audioTrack.play();
    this.props.playTrack(true);
  }

  pauseTrack = () => {
    if (this.audioTrack) {
      this.audioTrack.pause();
    }
  }

  resumeTrack = () => {
    if (this.audioTrack) {
      // resume currently paused song
      this.audioTrack.play();
    }
  }

  /** 
   * Only play tracks when a new mp3 url is passed in 
   * @param {String} songUrl - the preview track url
   */
  audioControls = (songUrl) => {
    // If audio element is not defined create a new one
    if (!this.audioTrack) {
      this.audioTrack = new Audio(songUrl);
      this.audioTrack.ontimeupdate = this.getCurrentTime;
      this.playTrack();
    }
    // pause current track and create new audio element and play the new one
    this.audioTrack.pause();
    this.audioTrack = new Audio(songUrl);
    this.audioTrack.ontimeupdate = this.getCurrentTime;
    this.playTrack();
  }

  render() {
    return (
      <div className="container">
        <LeftSideMenu />
        <div className="container__main-view">
          <TopHeader />
          <MainView
            playTrack={this.playTrack}
            audioControls={this.audioControls} />
        </div>
        <Footer
          resumeTrack={this.resumeTrack}
          pauseTrack={this.pauseTrack} />
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    volume: state.playerControlsReducer.volume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(actionTypes.setToken(token)),
    fetchUserPlaylists: (token) => dispatch(actionTypes.fetchUserPlaylists(token)),
    fetchUserProfile: (token) => dispatch(actionTypes.fetchUserProfile(token)),
    playTrack: (trackIsPlaying) => dispatch(actionTypes.playTrack(trackIsPlaying)),
    setCurrentTime: (time) => dispatch(actionTypes.setCurrentTime(time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);