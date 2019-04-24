import React from 'react'
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';

const SongList = (props) => {
  let playListName;
  let playListDescription;
  let trackList;

  let trackListArray;
  let trackListArtistArray;

  const setCurrentPlayerTrack = (track) => {
    // Set album image on footer
    if (track.album) {
      props.setAlbumImage(track.album.images[2].url)
    }
    // Set track on footer
    props.setPlayerTrack(track)
  }

  // Get tracks for a playlist or album
  if (props.trackList) {
    // return tracks for a playlist
    if (props.trackList.tracks) {
      // set the track list for the browse view
      if (props.songView === 'BrowseViewSongList') {
        console.log('in browse view ', props.trackList);
        trackList = props.trackList.tracks.items
        playListName = props.trackList.name;
        playListDescription = props.trackList.description;
        trackListArray = trackList.map((track, idx) => {
          if (track.track) {
            return (
              <li key={track.track.id + idx} onClick={() => setCurrentPlayerTrack(track.track)}>
                <p>{track.track.name}</p>
              </li>
            )
          }
        })
        // set the track list for the user playlist view
      } else if (props.songView === 'UserPlaylistTracks') {
        trackList = props.trackList.tracks.items
        playListName = props.trackList.name;
        playListDescription = props.trackList.description;
        trackListArray = trackList.map((track, idx) => {
          if (track.track) {
            return (
              <li key={track.track.id + idx} onClick={() => setCurrentPlayerTrack(track.track)}>
                <p>{track.track.name}</p>
              </li>
            )
          }
        })
      }
    } else {
      // return tracks for a album
      trackListArray = props.trackList.map((track, idx) => {
        return (
          <li key={idx} onClick={() => setCurrentPlayerTrack(track)}>
            <p>{track.name}</p>
          </li>
        )
      })
    }
  }

  // Get the track list for an artist
  if (props.artistTrackList) {
    trackListArtistArray = props.artistTrackList.map((track, idx) => {
      return (
        <li key={idx} onClick={() => setCurrentPlayerTrack(track)} >
          <p>{track.name}</p>
        </li >
      )
    })
  }

  const trackListContainer = (
    <div className="song-list">
      <h1>{playListName}</h1>
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
    props.songView === 'ArtistTracks' ? trackListArtistContainer : trackListContainer
  )
}

const mapStateToProps = (state) => {
  return {
    songView: state.mainViewReducer.songView,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);