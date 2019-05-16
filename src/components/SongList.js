import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';
let playListName;
let playListDescription;
let trackList;
let playListImage;
let playListOwner;
let playListTotalSongs;
let playListFollowers;

let trackListArray;
let trackListArtistArray;
class SongList extends Component {

  /** Updates previous and next track when buttons are clicked*/
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Set up the track index in redux store
    if (trackList && nextProps.trackIndex >= 0) {
      let nextTrack = trackList.find((track, i) => {
        if (i === nextProps.trackIndex) return track;
      })
      if (nextTrack) {
        this.props.audioControls(nextTrack.track.preview_url);
        this.props.setPlayerTrack(nextTrack.track)
        this.props.setAlbumImage(nextTrack.track.album.images[2].url)
      }

    }
    // returns next and previous track for artist playlist
    if (this.props.artistTrackList && nextProps.trackIndex >= 0 && this.props.songView === 'ArtistTracks') {
      let nextTrack = this.props.artistTrackList.find((track, i) => {
        if (i === nextProps.trackIndex) return track;
      })
      if (nextTrack) {
        if (nextTrack.preview_url) {
          this.props.audioControls(nextTrack.preview_url);
        }
        this.props.setPlayerTrack(nextTrack.album)
        this.props.setAlbumImage(nextTrack.album.images[2].url)
      }
    }
    return true;
  }

  /** Sets the current track when clicked */
  setCurrentPlayerTrack = (track) => {
    // Set album image on footer
    if (track.album) {
      this.props.setAlbumImage(track.album.images[2].url)
    }
    // Set track on footer
    this.props.setPlayerTrack(track);
    this.props.audioControls(track.preview_url);
  }

  render() {
    // Get tracks for a playlist or album
    if (this.props.trackList) {
      // return tracks for a playlist
      if (this.props.trackList.tracks) {
        // set the track list for the browse view
        if (this.props.songView === 'BrowseViewSongList') {
          trackList = this.props.trackList.tracks.items
          playListName = this.props.trackList.name;
          playListDescription = this.props.trackList.description;
          playListImage = this.props.trackList.images[0].url;
          playListOwner = this.props.trackList.owner.display_name;
          playListTotalSongs = this.props.trackList.tracks.total;
          playListFollowers = this.props.trackList.followers.total;
          trackListArray = trackList.map((track, idx) => {
            if (track.track) {
              return (
                <li key={track.track.id + idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track.track) }}>
                  <p>{track.track.name}</p>
                </li>
              )
            }
          })
          // set the track list for the user playlist view
        } else if (this.props.songView === 'UserPlaylistTracks') {
          // console.log("playlist is ", this.props.trackList)
          trackList = this.props.trackList.tracks.items;
          playListName = this.props.trackList.name;
          playListDescription = this.props.trackList.description;
          playListImage = this.props.trackList.images[0].url;
          playListOwner = this.props.trackList.owner.display_name;
          playListTotalSongs = this.props.trackList.tracks.total;
          playListFollowers = this.props.trackList.followers.total;

          trackListArray = trackList.map((track, idx) => {
            if (track.track) {
              return (
                <li key={track.track.id + idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track.track) }}>
                  <p>{track.track.name}</p>
                </li>
              )
            }
          })
        }
      } else {
        // return tracks for a album
        trackListArray = this.props.trackList.map((track, idx) => {
          return (
            <li key={idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track) }}>
              <p>{track.name}</p>
            </li>
          )
        })
      }
    }

    // Get the track list for an artist
    if (this.props.artistTrackList) {
      console.log('artist tracklist is ', this.props.artistTrackList)
      trackListArtistArray = this.props.artistTrackList.map((track, idx) => {
        return (
          <li key={idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track) }} >
            <p>{track.name}</p>
          </li >
        )
      })
    }

    const trackListContainer = (
      <div className="song-list">
        <img src={playListImage} alt="" />
        <h1>{playListName}</h1>
        <p>Created by: {playListOwner}</p>
        <p>{playListTotalSongs} Songs</p>
        <p>Followers {playListFollowers}</p>
        <p>{playListDescription}</p>
        <ul>
          {trackListArray}
        </ul>
      </div>
    )

    const trackListArtistContainer = (
      <div className="song-list">
        <ul>
          {trackListArtistArray}
        </ul>
      </div>
    )

    return (
      this.props.songView === 'ArtistTracks' ? trackListArtistContainer : trackListContainer
    )
  }
}

const mapStateToProps = (state) => {
  return {
    songView: state.mainViewReducer.songView,
    trackIndex: state.playerControlsReducer.trackIndex,
    trackList: state.playlistReducer.data,
    artistTrackList: state.playlistReducer.artistTracks,
    playlistTracks: state.playlistReducer.playlistTracks,
    title: state.mainViewReducer.title,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    setPlayerTrack: (track) => dispatch(actionTypes.setPlayerTrack(track)),
    setAlbumImage: (imageUrl) => dispatch(actionTypes.setAlbumImage(imageUrl)),
    setCurrentTrackIndex: (trackIndex) => dispatch(actionTypes.setCurrentTrackIndex(trackIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);