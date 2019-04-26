import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ReactComponent as VolumeIcon } from '../static/images/speaker.svg';
import * as actionTypes from '../store/actions'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }

  componentDidMount() {
    // const input = this.myInput.current;
    this.rangeColor(this.myInput);
  }

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
            <i className="fas fa-step-forward"></i>
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
            step={1}
            // value={50}
            ref={input => { this.myInput = input }}
            min={0}
            max={100} />
        </div>
      </div>
    )
  }

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
