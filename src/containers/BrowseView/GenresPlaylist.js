import React from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

const CategoryPlaylist = (props) => {

  const fetchCategoryPlaylistTracks = (playlistId) => {
    props.fetchPlaylistTracks(props.token, playlistId);
    props.updateSongListView('BrowseViewSongList');
    props.setBrowseView('trackList');
  }

  let albums;
  if (props.categoryPlaylist) {
    albums = props.categoryPlaylist.map((album) => {
      return (
        <div key={album.id} onClick={() => fetchCategoryPlaylistTracks(album.id)}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaylistTracks: (token, playlistId) => dispatch(actionTypes.fetchPlaylistTracks(token, playlistId)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
  }
}

const mapStateToProps = (state) => {
  return {
    categoryPlaylist: state.browseViewReducer.categoryPlaylist,
    token: state.tokenReducer.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPlaylist);
