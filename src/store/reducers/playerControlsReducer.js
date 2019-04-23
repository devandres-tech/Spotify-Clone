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

    default:
      return state;
  }
}

export default playerControlsReducer;