import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseView from '../containers/BrowseView/BrowseView';
import SongsView from '../containers/SongsView';
import RecentlyPlayed from '../containers/RecentlyPlayed';
import GenresView from '../containers/BrowseView/Genres';
import * as actionTypes from '../store/actions'


class MainView extends Component {

  // set genres view title when as soon as component mounts
  componentDidMount() {
    this.props.setBrowseView('genres')
  }

  // Update the main view based on the 
  // current main view title
  renderMainViewSwitch() {
    // whenever the token is available fetch 
    // browse categories to display as default
    if (this.props.token) {
      this.props.fetchBrowseCategories(this.props.token);
    }
    switch (this.props.title) {
      case 'Browse':
        return <BrowseView />
      case 'Songs':
        return <SongsView />
      case 'RecentlyPlayed':
        return <RecentlyPlayed />
      // set default view to to browse view
      default:
        return <BrowseView />
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

const mapDisPatchToProps = (dispatch) => {
  return {
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
    fetchBrowseCategories: (token) => dispatch(actionTypes.fetchBrowseCategories(token))
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.mainViewReducer.title,
    token: state.tokenReducer.token
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(MainView);

