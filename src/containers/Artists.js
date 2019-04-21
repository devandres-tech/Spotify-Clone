import { connect } from 'react-redux';
import React, { Component } from 'react'

import * as actionTypes from '../store/actions';

class Artists extends Component {

  onArtistClick = (artistId) => {
    if (this.props.token) {
      this.props.fetchArtistTracks(this.props.token, artistId);
      this.props.updateTitle('PlaylistTracks');
      this.props.updateSongListView('ArtistTracks');
    }
  }

  render() {
    const { artists: { artists } } = this.props;
    let artistList;
    artistList = artists.map((artist) => {
      return (
        <div onClick={() => this.onArtistClick(artist.id)} key={artist.id}>
          <img src={artist.images[1].url} alt="" />
          <p>{artist.name}</p>
        </div>
      )
    })

    return (
      <div className="browse-container">
        {artistList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    artists: state.playlistReducer.artists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
    updateTitle: (title) => dispatch(actionTypes.updateTitle(title)),
    fetchArtistTracks: (token, artistId) => dispatch(actionTypes.fetchArtistTracks(token, artistId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);