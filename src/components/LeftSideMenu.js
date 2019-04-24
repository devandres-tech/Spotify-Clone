import React from 'react';
import { connect } from 'react-redux';
// import BrowseIcon from '../static/images/box.svg';

import * as actionTypes from '../store/actions';


const LeftSideMenu = (props) => {

  const getPlaylistTracks = (playlistId) => {
    if (props.token) {
      props.fetchPlaylistTracks(props.token, playlistId);
      props.updateSongListView('PlaylistTracks')
      props.updateTitle('PlaylistTracks')
    }
  }

  const renderUserPlaylist = () => {
    if (props.userPlaylists) {
      const playlistNames = props.userPlaylists.map((playlist) => {
        return (
          <li onClick={() => getPlaylistTracks(playlist.id)} key={playlist.id}>
            {playlist.name}
          </li>
        )
      })
      return playlistNames;
    }
  }

  const renderUserLibrary = () => {
    return (
      <>
        <li onClick={() => props.updateTitle('Recently Played')}>Recently Played</li>
        <li onClick={() => props.updateTitle('Favorite Songs')}>Favorite Songs</li>
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
      <div className="browse-section">
        <li onClick={onBrowseClick}>
          Browse
        </li>
        <li>Radio</li>
      </div>
      <div className="library-items">
        <p>YOUR LIBRARY</p>
        {renderUserLibrary()}
      </div>
      <div className="playlist-items">
        <p>PLAYLISTS</p>
        {renderUserPlaylist()}
      </div>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    userPlaylists: state.userReducer.userPlaylists
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    updateTitle: (title) => dispatch(actionTypes.updateTitle(title)),
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
    fetchPlaylistTracks: (token, playlistId) => dispatch(actionTypes.fetchPlaylistTracks(token, playlistId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);