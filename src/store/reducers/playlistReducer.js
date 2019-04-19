import * as actionTypes from '../actions/actionTypes';

export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYLIST_TRACKS:
      return {
        ...state,
        data: action.payload.data
      }

    case actionTypes.FETCH_ALBUM_TRACKS:
      return {
        ...state,
        data: action.payload.data.items
      }

    default:
      return state;
  }
}

export default playlistReducer;