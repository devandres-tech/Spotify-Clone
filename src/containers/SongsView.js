import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions'

class SongsView extends Component {

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <h1>This is the songs view</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
}

export default connect()(SongsView);