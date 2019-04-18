import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenresView from './Genres';
import NewReleasesView from './NewReleases';
import * as actionTypes from '../../store/actions';
import Featured from './Featured';

class BrowseView extends Component {

  onSetBrowseView = () => {
    this.props.setBrowseView('genres');
    this.props.fetchBrowseCategories(this.props.token);
  }

  onSetFeaturedView = () => {
    this.props.setBrowseView('featured');
    this.props.fetchFeaturedPlaylist(this.props.token);
  }

  render() {
    const { browseTitle } = this.props;
    return (
      <div>
        <p onClick={() => this.onSetBrowseView()}>Genres</p>
        <p onClick={() => this.props.setBrowseView('newReleases')}>New Releases</p>
        <p onClick={() => this.onSetFeaturedView()}>Featured</p>
        {
          browseTitle === 'genres' ? <GenresView /> :
            browseTitle === 'newReleases' ? <NewReleasesView /> :
              browseTitle === 'featured' ? <Featured /> : ''
        }
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
    fetchFeaturedPlaylist: (token) => dispatch(actionTypes.fetchFeaturedPlaylist(token)),
    fetchBrowseCategories: (token) => dispatch(actionTypes.fetchBrowseCategories(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);