import { connect } from 'react-redux';
import React, { Component } from 'react'

import * as actionTypes from '../store/actions';

let artistList;
class Artists extends Component {

  componentDidMount() {
    // console.log('traacks are ', this.props.tracks);
    const artistIds = this.props.tracks.map((track) => {
      return track.track.artists[0].id;
    })
    // Get several artists
    this.props.fetchArtists(this.props.token, artistIds.toString());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    artistList = nextProps.artists.artists.map((artist) => {
      return (
        <div className="artist-container" onClick={() => this.onArtistClick(artist.id)} key={artist.id}>
          <img className="artist-img" src={artist.images[1].url} alt="" />
          <p>{artist.name}</p>
        </div>
      )
    })
    return true;
  }

  onArtistClick = (artistId) => {
    this.props.setCurrentTrackIndex();
    if (this.props.token) {
      this.props.fetchArtistTracks(this.props.token, artistId);
      // update views to render the chosen content
      this.props.updateTitle('PlaylistTracks');
      this.props.updateSongListView('ArtistTracks');
    }
  }

  render() {
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
    artists: state.playlistReducer.artists,
    tracks: state.userReducer.userTracks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSongListView: (title) => dispatch(actionTypes.updateSongListView(title)),
    fetchArtists: (token, artistId) => dispatch(actionTypes.fetchArtists(token, artistId)),
    updateTitle: (title) => dispatch(actionTypes.updateTitle(title)),
    fetchArtistTracks: (token, artistId) => dispatch(actionTypes.fetchArtistTracks(token, artistId)),
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);