import React from 'react'
import { connect } from 'react-redux';

const NewReleases = (props) => {
  let albums;
  // console.log('new releases ', props.newReleasesAlbums)
  if (props.newReleasesAlbums) {
    albums = props.newReleasesAlbums.map((album) => {
      return (
        <div key={album.id}>
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

const mapStateToProps = (state) => {
  return {
    newReleasesAlbums: state.browseViewReducer.newReleases,
  }
}

export default connect(mapStateToProps)(NewReleases);
