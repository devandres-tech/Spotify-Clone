import React from 'react'
import { connect } from 'react-redux';

const SongList = (props) => {
  let playListName;
  if (props.trackList) {
    playListName = props.trackList.name;
    //console.log("in props is", props.trackList);
  }

  return (
    <div>
      <h1>{playListName}</h1>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    trackList: state.playlistReducer.data
  }
}

export default connect(mapStateToProps)(SongList);