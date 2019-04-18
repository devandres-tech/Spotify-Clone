import React from 'react'
import { connect } from 'react-redux';

const SongList = (props) => {
  let playListName;
  let playListDescription;
  let trackList;
  let trackListArray;

  const audioElement = (songUrl) => {
    const audio = new Audio(songUrl);
    audio.play();
  }

  if (props.trackList) {
    if (props.trackList.tracks) {
      trackList = props.trackList.tracks.items;
      playListName = props.trackList.name;
      playListDescription = props.trackList.description;
      trackListArray = trackList.map((track) => {
        return (
          <li key={track.track.id} onClick={() => audioElement(track.track.preview_url)}>
            <p>{track.track.name}</p>
          </li>
        )
      })

    } else {
      trackListArray = props.trackList.map((track) => {
        return (
          <li key={track.id} onClick={() => audioElement(track.preview_url)}>
            <p>{track.name}</p>
          </li>
        )
      })
    }
  }

  return (
    <div>
      <h1>{playListName}</h1>
      <p>{playListDescription}</p>
      <ul>
        {trackListArray}
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    trackList: state.playlistReducer.data,
    // albumTrackList: state.playlistReducer.albumTracks
    newReleasesAlbums: state.browseViewReducer.newReleases,
  }
}

export default connect(mapStateToProps)(SongList);