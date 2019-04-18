import React from 'react'
import { connect } from 'react-redux';

const CategoryPlaylist = (props) => {
  let albums;
  if (props.categoryPlaylist) {
    albums = props.categoryPlaylist.map((album) => {
      return (
        <div key={album.id}>
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
    categoryPlaylist: state.browseViewReducer.categoryPlaylist,
  }
}

export default connect(mapStateToProps)(CategoryPlaylist);
