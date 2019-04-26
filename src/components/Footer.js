import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionTypes from '../store/actions'

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
          {
            props.trackIsPlaying ? <i onClick={
              () => {
                props.pauseTrack();
                props.playTrack(false);
              }
            } className="far fa-pause-circle"></i>
              : <i className="far fa-play-circle" onClick={
                () => {
                  props.resumeTrack();
                  props.playTrack(true);
                }
              }></i>
          }
          <i className="fas fa-step-forward"></i>
        </div>
        <div className="progress-bar-container">
          <p className="current-time">{
            props.currentTime ? moment().minutes(0).second(props.currentTime).format('m:ss') : '0:00'
          }</p>
          <div className="progress-bar"></div>
          <p className="time-end">0:30</p>
        </div>
      </div>
    </div>
  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (trackIsPlaying) => dispatch(actionTypes.playTrack(trackIsPlaying))
  }
}

const mapStateToProps = (state) => {
  return {
    albumTrack: state.playerControlsReducer.track,
    albumImage: state.playerControlsReducer.imageUrl,
    trackIsPlaying: state.playerControlsReducer.trackIsPlaying,
    currentTime: state.playerControlsReducer.currentTime
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);
