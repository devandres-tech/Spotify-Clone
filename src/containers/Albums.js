import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions/index';

class Albums extends Component {

  componentDidMount() {
    // this.props.fetchUserAlbums(this.props.token);
    // this.props.setBrowseView('trackList')
  }
  render() {
    return (
      <div>
        <h1>THis is the alubmss...</h1>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserAlbums: (token) => dispatch(actionTypes.fetchUserAlbums(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
