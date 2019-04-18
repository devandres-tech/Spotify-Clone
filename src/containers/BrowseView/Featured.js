import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions'


const Featured = (props) => {
  // Set onClick function for every album
  const onAlbumClick = (playlistId) => {
    // fetch tracks for a selected playlist and update browse view
    props.fetchFeaturedTracks(props.token, playlistId);
    props.setBrowseView('featuredTrackList');
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
    <div className="browse-container" >
      {albums}
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    featuredPlaylist: state.browseViewReducer.featured,
    token: state.tokenReducer.token,
    browseTitle: state.browseViewReducer.title,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeaturedTracks: (token, playlistId) => dispatch(actionTypes.fetchFeaturedTracks(token, playlistId)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
