import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenresView from './Genres';
import NewReleasesView from './NewReleases';
import * as actionTypes from '../../store/actions';
import Featured from './Featured';
import SongList from '../../components/SongList';
import GenresPlaylist from './GenresPlaylist';

class BrowseView extends Component {

  componentDidMount() {
    this.props.updateSongListView('BrowseViewTracks');
  }

  // Update browse title and dispatch action
  onSetBrowseView = () => {
    this.props.setBrowseView('genres');
    this.props.fetchBrowseCategories(this.props.token);
  }

  // Update browse title to render desired component
  // and dispatch action
  onSetFeaturedView = () => {
    this.props.setBrowseView('featured');
    this.props.fetchFeaturedPlaylist(this.props.token);
  }

  onSetNewReleasesView = () => {
    this.props.setBrowseView('newReleases');
    this.props.fetchNewReleasesPlaylist(this.props.token);
  }

  render() {
    const { browseTitle } = this.props;
    return (
      <>
        <div className="browse-view-menu">
          <p onClick={() => this.onSetBrowseView()}>Genres & Moods</p>
          <p onClick={() => this.onSetNewReleasesView()}>New Releases</p>
          <p onClick={() => this.onSetFeaturedView()}>Featured</p>
        </div>
        {
          browseTitle === 'genres' ? <GenresView /> :
            browseTitle === 'newReleases' ? <NewReleasesView /> :
              browseTitle === 'featured' ? <Featured /> :
                browseTitle === 'trackList' ? <SongList audioControls={this.props.audioControls} /> :
                  browseTitle === 'categoryPlaylist' ? <GenresPlaylist /> : <GenresView />
        }
      </>
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
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
    fetchFeaturedPlaylist: (token) => dispatch(actionTypes.fetchFeaturedPlaylist(token)),
    fetchBrowseCategories: (token) => dispatch(actionTypes.fetchBrowseCategories(token)),
    fetchNewReleasesPlaylist: (token) => dispatch(actionTypes.fetchNewReleasesPlaylist(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);