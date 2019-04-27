import * as actionTypes from '../actions/actionTypes';

export const playerControlsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_TRACK:
      return {
        ...state,
        track: action.track
      }

    case actionTypes.SET_ALBUM_IMAGE:
      return {
        ...state,
        imageUrl: action.albumUrl
      }

    case actionTypes.PLAY_TRACK:
      return {
        ...state,
        trackIsPlaying: action.trackIsPlaying
      }

    case actionTypes.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      }

    case actionTypes.SET_VOLUME:
      return {
        ...state,
        volume: action.volume
      }

    case actionTypes.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        trackIndex: action.trackIdx
      }

    case actionTypes.UPDATE_TRACK_INDEX:
      return {
        ...state,
        trackIndex: action.trackIdx
      }

    default:
      return state;
  }
}

export default playerControlsReducer;