import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowseView from '../containers/BrowseView/BrowseView';
import FavoriteSongs from '../containers/FavoriteSongs';
import RecentlyPlayed from '../containers/RecentlyPlayed';
import * as actionTypes from '../store/actions';
import Artists from '../containers/Artists';
import Albums from '../containers/Albums';
import SongList from '../components/SongList';

class MainView extends Component {
  // set genres view title when component mounts
  componentDidMount() {
    this.props.setBrowseView('genres')
  }

  renderMainViewSwitch() {
    // whenever the token is available fetch 
    // browse categories to display as default
    if (this.props.token) {
      this.props.fetchBrowseCategories(this.props.token);
    }
    switch (this.props.title) {
      case 'Browse':
        return <BrowseView
          audioControls={this.props.audioControls} />
      case 'Songs':
        return <FavoriteSongs />
      case 'Recently Played':
        return <RecentlyPlayed audioControls={this.props.audioControls} />
      case 'Artists':
        return <Artists />
      case 'Albums':
        return <Albums audioControls={this.props.audioControls} />
      case 'PlaylistTracks':
        return <SongList audioControls={this.props.audioControls} />
      // set default view to to browse view
      default:
        return <FavoriteSongs audioControls={this.props.audioControls} />
    }
  }
  render() {
    return (
      <div className="container__main-view--content">
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

