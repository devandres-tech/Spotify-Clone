import React from 'react'
import { connect } from 'react-redux';


const Featured = (props) => {
  let albums;
  if (props.featuredPlaylist) {
    albums = props.featuredPlaylist.map((album) => {
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
    featuredPlaylist: state.browseViewReducer.featured,
  }
}

export default connect(mapStateToProps)(Featured);
