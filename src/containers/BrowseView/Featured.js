import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions'


const Featured = (props) => {
  // Set onClick function for every album
  const onAlbumClick = (playlistId) => {
    // fetch tracks for a selected playlist and update browse view
    props.fetchPlaylistTracks(props.token, playlistId);
    // Set the song view to display the song list
    props.updateSongListView('BrowseViewSongList');
    props.setBrowseView('trackList');
  }

  let albums;
  if (props.featuredPlaylist) {
    albums = props.featuredPlaylist.map((album) => {
      return (
        <div onClick={() => onAlbumClick(album.id)} key={album.id}>
          <img src={album.images[0].url} alt="" />
          <p>{album.name}</p>
        </div>
      )
    })
  }

  return (
    <div className="browse-container">
      {albums}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    featuredPlaylist: state.browseViewReducer.featured,
    token: state.tokenReducer.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaylistTracks: (token, playlistId) => dispatch(actionTypes.fetchPlaylistTracks(token, playlistId)),
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);