import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';


const LeftSideMenu = (props) => {
  // Fetch tracks when user clicks on a playlist link
  const getPlaylistTracks = (playlistId, e) => {
    props.setCurrentTrackIndex();

    if (props.token) {
      props.fetchPlaylistTracks(props.token, playlistId);
      props.updateSongListView('UserPlaylistTracks')
      props.updateTitle('PlaylistTracks')
    }
  }

  // Renders the list of user's playlist
  const renderUserPlaylist = () => {
    if (props.userPlaylists) {
      const playlistNames = props.userPlaylists.map((playlist) => {
        return (
          <li onClick={(e) => getPlaylistTracks(playlist.id, e)} key={playlist.id}>
            {playlist.name}
          </li>
        )
      })
      return playlistNames;
    }
  }

  // Update main header title on browse click
  const onBrowseClick = () => {
    props.updateTitle('Browse');
    props.setBrowseView('genres');
    props.fetchBrowseCategories(props.token);
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

  // Set an active class to the side menu items when clicked
  const setActiveClass = (e) => {
    e.target.classList.add('active-playlist');
    const divEl = document.createElement('div');
    divEl.classList.toggle('active');
    // Only add div if the item clicked was an li element
    if (e.target.tagName === 'LI') {
      // remove all previous divs
      let allDivEl = document.getElementsByClassName('active');
      for (let i = 0; i < allDivEl.length; i++) {
        allDivEl[i].remove();
      }
      // set div to current li target
      e.target.prepend(divEl)
    }
  }

  return (
    <ul onClick={setActiveClass} className="container__left-menu">
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
    fetchPlaylistTracks: (token, playlistId) => dispatch(actionTypes.fetchPlaylistTracks(token, playlistId)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
    fetchBrowseCategories: (token) => dispatch(actionTypes.fetchBrowseCategories(token)),
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);