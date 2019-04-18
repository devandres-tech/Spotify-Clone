import React from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions'


const Featured = (props) => {
  // Set onClick function for every album
  const onAlbumClick = (playlistId) => {
    // fetch tracks for a selected playlist
    console.log('id is ', playlistId)
    props.fetchFeaturedTracks(props.token, playlistId)
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
    token: state.tokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeaturedTracks: (token, playlistId) => dispatch(actionTypes.fetchFeaturedTracks(token, playlistId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
