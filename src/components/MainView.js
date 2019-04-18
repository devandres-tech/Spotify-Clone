import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseView from '../containers/BrowseView/BrowseView';
import SongsView from '../containers/SongsView';


class MainView extends Component {

  // Update the main view based on the 
  // current main view title
  renderMainViewSwitch() {
    switch (this.props.title) {
      case 'Browse':
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
  }
}

export default connect(mapStateToProps)(MainView);

