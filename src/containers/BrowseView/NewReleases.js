import React from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions'

const NewReleases = (props) => {

  // Set onClick function for every album
  const onAlbumClick = (playlistId, albumImg) => {
    // fetch tracks for a selected playlist and update browse view
    props.fetchAlbumTracks(props.token, playlistId);
    // Set album image on footer
    props.setAlbumImage(albumImg);
    props.setBrowseView('trackList');
  }

  let albums;
  if (props.newReleasesAlbums) {
    albums = props.newReleasesAlbums.map((album) => {
      return (
        <div key={album.id} onClick={() => onAlbumClick(album.id, album.images[2].url)}>
          <img src={album.images[1].url} alt="" />
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


const mapDispatchToProps = (dispatch) => {
  return {
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
    fetchAlbumTracks: (token, playlistId) => dispatch(actionTypes.fetchAlbumTracks(token, playlistId)),
  }
}

const mapStateToProps = (state) => {
  return {
    newReleasesAlbums: state.browseViewReducer.newReleases,
    token: state.tokenReducer.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReleases);
