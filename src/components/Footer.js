import React, { Component } from 'react';
import { connect } from 'react-redux';

const Footer = (props) => {
  let albumTrack;
  let albumArtist;
  if (props.albumTrack && props.albumImage) {
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
      <div className="player-container">
        <div className="player-controls">
          <i className="fas fa-step-backward"></i>
          <i className="far fa-play-circle"></i>
          <i className="fas fa-step-forward"></i>
        </div>
        <div className="progress-bar-container">
          <p className="current-time">0:00</p>
          <div className="progress-bar"></div>
          <p className="time-end">3:20</p>
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
