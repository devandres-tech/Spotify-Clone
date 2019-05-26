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

  /** Convert milliseconds to minute:second format */
  msToHMS(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  render() {
    /** Get the track list for a playlist or album depending on the songView */
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
                <div
                  className="song-list-title-row"
                  key={track.track.id + idx}
                  onClick={() => {
                    this.props.setCurrentTrackIndex(idx);
                    this.setCurrentPlayerTrack(track.track)
                  }}
                >
                  <p className="song-list-col-5">{track.track.name}</p>
                  <p className="song-list-col-5">{track.track.artists[0].name}</p>
                  <p className="song-list-col-5">{track.track.album.name}</p>
                  <p className="song-list-col-5 date-added">{track.added_at.slice(0, 10)}</p>
                  <p className="song-list-col-5 duration">{this.msToHMS(track.track.duration_ms)}</p>
                </div>
              )
            }
          })
          // set the track list for the user playlist view
        } else if (this.props.songView === 'UserPlaylistTracks') {
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
      trackListArtistArray = this.props.artistTrackList.map((track, idx) => {
        return (
          <li key={idx} onClick={() => { this.props.setCurrentTrackIndex(idx); this.setCurrentPlayerTrack(track) }} >
            <p>{track.name}</p>
          </li >
        )
      })
    }

    const trackListContainer = (
      <div className="album-song-list">
        <div className="album-song-list__container">
          <img src={playListImage} alt="" />
          <div className="album-song-list__container--info">
            <p className="album-song-list__playlist">PLAYLIST</p>
            <h1 className="album-song-list__title">{playListName}</h1>
            <div className="album-song-list__description">
              <p>{playListDescription}</p>
              <p>Created by: {playListOwner} * {playListTotalSongs} songs</p>
              <p>{playListFollowers} FOLLOWERS</p>
              <button className="play-favorites-btn">Play</button>
            </div>
          </div>
        </div>
        <div className="song-list-container">
          <div className="song-list-title-row">
            <div className="song-list-col-5 song-title">title</div>
            <div className="song-list-col-5 song-artist">artist</div>
            <div className="song-list-col-5 song-album">album</div>
            <div className="song-list-col-5 song-date"><i className="far fa-calendar"></i></div>
            <div className="song-list-col-5 song-duration"><i className="far fa-clock"></i></div>
          </div>
          <div className="song-list">
            {trackListArray}
          </div>
        </div>
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