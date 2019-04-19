import React from 'react';
import { connect } from 'react-redux';
import { updateTitle, fetchBrowseCategories, fetchFeaturedPlaylist } from '../store/actions';
import { bindActionCreators } from "redux";

function LeftSideMenu(props) {

  const renderPlaylist = () => {
    return (
      <>
        <li>New Releases</li>
        <li>Albums</li>
        <li>artists</li>
      </>
    )
  }

  const renderUserLibrary = () => {
    return (
      <>
        <li onClick={() => props.updateTitle('RecentlyPlayed')}>Recently Played</li>
        <li onClick={() => props.updateTitle('Songs')}>Favorite Songs</li>
        <li onClick={() => props.updateTitle('Albums')}>Albums</li>
        <li onClick={() => props.updateTitle('Artists')}>Artists</li>
      </>
    )
  }

  // Update main header title on browse click
  const onBrowseClick = () => {
    props.updateTitle('Browse');
  }

  return (
    <ul className="container__left-menu">
      <li onClick={onBrowseClick}>Browse</li>
      <li>Radio</li>
      <li>YOUR LIBRARY</li>
      {renderUserLibrary()}
      <li>PLAYLISTS</li>
      {renderPlaylist()}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateTitle,
    fetchBrowseCategories,
    fetchFeaturedPlaylist
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);