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
    trackList = props.trackList.tracks.items;
    console.log('tr', trackList)
    playListName = props.trackList.name;
    playListDescription = props.trackList.description;
    console.log("in props is", props.trackList);
    trackListArray = trackList.map((track) => {
      return (
        <li key={track.track.id} onClick={() => audioElement(track.track.preview_url)}>
          <p>{track.track.name}</p>
        </li>
      )
    })
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
    trackList: state.playlistReducer.data
  }
}

export default connect(mapStateToProps)(SongList);