import React from 'react';
import { connect } from 'react-redux';
import { updateTitle } from '../store/actions';
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
        <li>Recently Played</li>
        <li onClick={() => props.updateTitle('Songs')}>Songs</li>
        <li onClick={() => props.updateTitle('Albums')}>Albums</li>
        <li onClick={() => props.updateTitle('Artists')}>Artists</li>
      </>
    )
  }

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateTitle }, dispatch)
}

export default connect(null, mapDispatchToProps)(LeftSideMenu);