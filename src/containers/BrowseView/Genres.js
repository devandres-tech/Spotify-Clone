import React from 'react'
import { connect } from 'react-redux';

const Genres = (props) => {
  let albums;
  if (props.albumGenres) {
    albums = props.albumGenres.map((album) => {
      return (
        <div key={album.id}>
          <img src={album.icons[0].url} alt="" />
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
    albumGenres: state.browseViewReducer.categories,
  }
}

export default connect(mapStateToProps)(Genres);
