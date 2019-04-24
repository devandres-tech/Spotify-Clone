import React, { Component } from 'react';
import { connect } from 'react-redux';

const Footer = (props) => {
  let albumTrack;
  let albumArtist;
  if (props.albumTrack || props.albumImage) {
    albumTrack = props.albumTrack.name;
    albumArtist = props.albumTrack.artists[0].name;
  }

  return (
    <div className="container__footer">
      <div className="container__footer--album-view">
        <img src={props.albumImage} alt="" />
        <div className="album-description">
          <p>{albumTrack}</p>
          <p>{albumArtist}</p>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    albumTrack: state.playerControlsReducer.track,
    albumImage: state.playerControlsReducer.imageUrl
  }
}

export default connect(mapStateToProps)(Footer);
