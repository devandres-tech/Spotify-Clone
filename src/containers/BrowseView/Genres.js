import React from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions'

const Genres = (props) => {

  const onAlbumClick = (categoryId) => {
    props.fetchCategoryPlaylist(props.token, categoryId);
    props.setBrowseView('categoryPlaylist')
  }

  let albums;
  if (props.albumGenres) {
    albums = props.albumGenres.map((album) => {
      return (
        <div onClick={() => onAlbumClick(album.id)} key={album.id}>
          <img src={album.icons[0].url} alt="" />
          <p className="category-title">{album.name}</p>
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

const mapDisPatchToProps = (dispatch) => {
  return {
    fetchCategoryPlaylist: (categoryId, token) => dispatch(actionTypes.fetchCategoryPlaylist(categoryId, token)),
    setBrowseView: (title) => dispatch(actionTypes.updateBrowseView(title)),
  }
}

const mapStateToProps = (state) => {
  return {
    albumGenres: state.browseViewReducer.categories,
    token: state.tokenReducer.token,
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Genres);
