import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ReactComponent as VolumeIcon } from '../static/images/speaker.svg';
import * as actionTypes from '../store/actions'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.volumeInput = React.createRef();
  }

  componentDidMount() {
    // const input = this.volumeInput.current;
    this.rangeColor(this.volumeInput);
  }

  getValue = () => {
    // dispatch action to set volume
    this.props.setVolume(this.volumeInput.value)
  }

  // Sets the volume bar
  rangeColor = (input) => {
    var wrp = document.createElement('div'),
      preBar = document.createElement('p'),
      min = parseInt(input.min, 10),
      max = parseInt(input.max, 10),
      range = max - min,
      getVal = function () {
        var w = parseInt(input.clientWidth, 10),
          t = ~~(w * (parseInt(input.value, 10) - min) / range);
        t = t - 6;
        return t;
      };
    wrp.className = 'barCnt';
    preBar.className = 'preBar';

    input.className = input.className.length ? (input.className + ' colorized') : 'colorized';
    input.parentNode.replaceChild(wrp, input);

    wrp.appendChild(input);
    wrp.appendChild(preBar);

    input.addEventListener('input', function () {
      preBar.style.width = getVal() + 'px';
    });

    preBar.style.width = getVal() + 'px';
  }


  render() {
    let albumArtist;
    let albumTrack;
    if (this.props.albumTrack) {
      albumArtist = this.props.albumTrack.artists[0].name;
      albumTrack = this.props.albumTrack.name;
    }
    return (
      <div className="container__footer">
        <div className="container__footer--album-view">
          <img src={this.props.albumImage} alt="" />
          <div className="album-description">
            <p>{albumTrack}</p>
            <p>{albumArtist}</p>
          </div>
        </div>
        <div className="player-container">
          <div className="player-controls">
            <i className="fas fa-step-backward"></i>
            {
              this.props.trackIsPlaying ? <i onClick={
                () => {
                  this.props.pauseTrack();
                  this.props.playTrack(false);
                }
              } className="far fa-pause-circle"></i>
                : <i className="far fa-play-circle" onClick={
                  () => {
                    this.props.resumeTrack();
                    this.props.playTrack(true);
                  }
                }></i>
            }
            <i className="fas fa-step-forward" onClick={() => this.props.updateTrackIndex()}>
            </i>
          </div>
          <div className="progress-bar-container">
            <p className="current-time">{
              this.props.currentTime ? moment().minutes(0).second(this.props.currentTime).format('m:ss') : '0:00'
            }</p>
            <div className='bar'>
              <div style={{ width: this.props.currentTime ? this.props.currentTime * 10 : 0 }} className="bar-progress"></div>
            </div>
            <p className="time-end">0:30</p>
          </div>
        </div>
        <div className="volume-container">
          <VolumeIcon className="volume-icon" fill="#fff" />
          <input
            type="range"
            onChange={() => this.getValue()}
            ref={input => { this.volumeInput = input }}
            min={0}
            max={100} />
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (trackIsPlaying) => dispatch(actionTypes.playTrack(trackIsPlaying)),
    setVolume: (volume) => dispatch(actionTypes.setVolume(volume)),
    updateTrackIndex: () => dispatch(actionTypes.updateTrackIndex())
  }
}

const mapStateToProps = (state) => {
  return {
    albumTrack: state.playerControlsReducer.track,
    albumImage: state.playerControlsReducer.imageUrl,
    trackIsPlaying: state.playerControlsReducer.trackIsPlaying,
    currentTime: state.playerControlsReducer.currentTime,
    trackList: state.playlistReducer.data,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);
