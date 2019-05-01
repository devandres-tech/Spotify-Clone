import * as actionTypes from './actionTypes';


let trackIdx;
export const setPlayerTrack = (track) => {
  return {
    type: actionTypes.SET_PLAYER_TRACK,
    track
  }
}

export const setAlbumImage = (albumUrl) => {
  return {
    type: actionTypes.SET_ALBUM_IMAGE,
    albumUrl
  }
}

export const playTrack = (trackIsPlaying) => {
  return {
    type: actionTypes.PLAY_TRACK,
    trackIsPlaying
  }
}

export const setCurrentTime = (currentTime) => {
  return {
    type: actionTypes.SET_CURRENT_TIME,
    currentTime
  }
}

export const setVolume = (volume) => {
  return {
    type: actionTypes.SET_VOLUME,
    volume
  }
}

export const setCurrentTrackIndex = (trackIndex) => {
  trackIdx = trackIndex;
  return {
    type: actionTypes.SET_CURRENT_TRACK_INDEX,
    trackIdx
  }
}

export const updateTrackIndex = () => {
  ++trackIdx
  return {
    type: actionTypes.UPDATE_TRACK_INDEX,
    trackIdx
  }
}

export const updateTrackIndexBackwards = () => {
  --trackIdx
  if (trackIdx < 0) {
    trackIdx = 0;
  }

  return {
    type: actionTypes.UPDATE_TRACK_INDEX,
    trackIdx
  }
}
