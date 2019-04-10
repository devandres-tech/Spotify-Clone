import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';
import LeftSideMenu from './LeftSideMenu';
import Footer from './Footer';
import MainView from './MainView';
import TopHeader from './Header';


class App extends Component {


  componentDidMount() {
    // client Secret: 109aff4eb4374830ab1113b0a224b2c9
    const clientId = '40fee03a615b470c8c8f73a02a634dcc';
    const URI = 'http://localhost:3001/callback/';
    const scopes = 'user-read-private%20user-read-email%20playlist-read-private%20user-library-read%20user-follow-read%20user-top-read%20user-read-currently-playing%20user-read-recently-played'
    // When component mounts request authorization
    // window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&response_type=token&redirect_uri=${URI}`
    let accessToken = window.location.hash.split('=')[1].split('&')[0];
    // console.log(params);
    console.log('prams is', accessToken)
    this.props.setToken(accessToken);
  }


  render() {
    console.log('porps is ', this.props);
    return (
      <div className="container">
        <LeftSideMenu />
        <TopHeader />
        <MainView />
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
    setToken: (token) => dispatch(actionTypes.setToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);