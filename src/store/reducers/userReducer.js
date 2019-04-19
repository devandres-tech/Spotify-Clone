import * as actionTypes from '../actions/actionTypes';

export const userPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_PLAYED_TRACKS:
      return {
        ...state,
        recentTracks: action.payload.data.items
      }

    case actionTypes.FETCH_USER_TRACKS:
      console.log("tas ", action.payload)
      return {
        ...state,
        userTracks: action.payload.data.items
      }

    default:
      return state;
  }
}

export default userPlaylistReducer;