import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenresView from './Genres';
import NewReleasesView from './NewReleases';
import PodcastView from './Podcast';
import * as actionTypes from '../../store/actions';

class BrowseView extends Component {

  renderBrowseViewSwitch = () => {
    switch (this.props.browseTitle) {
      case 'genres':
        return <GenresView />

      case 'newReleases':
        return <NewReleasesView />

      case 'podcast':
        return <PodcastView />
      default:
        return <GenresView />
    }
  }

  render() {
    return (
      <div>
        <p onClick={() => this.props.setBrowseView('genres')}>Genres</p>
        <p onClick={() => this.props.setBrowseView('newReleases')}>New Releases</p>
        <p onClick={() => this.props.setBrowseView('podcast')}>Podcast</p>
        {this.renderBrowseViewSwitch()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    browseTitle: state.browseViewReducer.title,
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);