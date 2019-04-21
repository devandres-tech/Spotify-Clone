import React from 'react'
import { connect } from 'react-redux';

const SongList = (props) => {
  let playListName;
  let playListDescription;
  let trackList;
  let trackListArray;
  let trackListArtistArray;

  const audioElement = (songUrl) => {
    const audio = new Audio(songUrl);
    audio.play();
  }

  // Get tracks for a playlist or album
  if (props.trackList) {
    // return tracks for a playlist
    if (props.trackList.tracks) {
      trackList = props.trackList.tracks.items || props.trackList.tracks;
      playListName = props.trackList.name;
      playListDescription = props.trackList.description;

      trackListArray = trackList.map((track, idx) => {
        // Only return valid tracks
        if (track.track) {
          return (
            <li key={track.track.id + idx} onClick={() => audioElement(track.track.preview_url)}>
              <p>{track.track.name}</p>
            </li>
          )
        }
      })

    } else {
      // return tracks for a album
      trackListArray = props.trackList.map((track, idx) => {
        return (
          <li key={idx} onClick={() => audioElement(track.preview_url)}>
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
        <li key={idx} onClick={() => audioElement(track.preview_url)}>
          <p>{track.name}</p>
        </li>
      )
    })
  }

  const trackListContainer = (
    <div>
      <h1>{playListName}</h1>
      <p>{playListDescription}</p>
      <ul>
        {trackListArray}
      </ul>
    </div>
  )

  const trackListArtistContainer = (
    <div>
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
    artistTrackList: state.playlistReducer.artistTracks
  }
}

export default connect(mapStateToProps)(SongList);