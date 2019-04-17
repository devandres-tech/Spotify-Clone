import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseView from '../containers/BrowseView/BrowseView';
import SongsView from '../containers/SongsView';
import *  as actionTypes from '../store/actions';


class MainView extends Component {

  // Render side menu view
  renderMainViewSwitch() {
    switch (this.props.title) {
      case 'Browse':
        this.props.fetchBrowseCategories(this.props.token);
        return <BrowseView />
      case 'Songs':
        return <SongsView />
      default:
        break;
    }
  }
  render() {

    return (
      <div>
        {this.renderMainViewSwitch()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.mainViewReducer.title,
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrowseCategories: (token) => dispatch(actionTypes.fetchBrowseCategories(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

