import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';
import LeftSideMenu from '../components/LeftSideMenu';
import Footer from '../components/Footer';
import MainView from '../components/MainView';
import TopHeader from '../components/Header';


class App extends Component {


  /* When component mounts request authorization */
  componentDidMount() {
    const clientId = '40fee03a615b470c8c8f73a02a634dcc';
    const URI = 'http://localhost:4040/callback/';
    // scopes
    const scopes = 'user-read-private%20user-read-email%20playlist-read-private%20user-library-read%20user-follow-read%20user-top-read%20user-read-currently-playing%20user-read-recently-played'
    let accessToken;
    if (window.location.hash.length === 0) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&response_type=token&redirect_uri=${URI}`
    } else {
      accessToken = window.location.hash.split('=')[1].split('&')[0];
      this.props.setToken(accessToken);
    }
  }

  audioControls = (songUrl) => {
    const audio = new Audio(songUrl);
    audio.play();
  }

  render() {
    // Fetch users playlists to render the playlists names
    // in the left side menu
    if (this.props.token) {
      this.props.fetchUserPlaylists(this.props.token);
      this.props.fetchUserProfile(this.props.token);
    }

    return (
      <div className="container">
        <LeftSideMenu />
        <div className="container__main-view">
          <TopHeader />
          <MainView />
        </div>
        <Footer />
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
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(actionTypes.setToken(token)),
    fetchUserPlaylists: (token) => dispatch(actionTypes.fetchUserPlaylists(token)),
    fetchUserProfile: (token) => dispatch(actionTypes.fetchUserProfile(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);