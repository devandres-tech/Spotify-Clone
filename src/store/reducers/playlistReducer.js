import * as actionTypes from '../actions/actionTypes';

export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FEATURED_TRACKS:
      console.log("track is ", action.payload.data);
      return {
        ...state,
        tracks: action.payload.data
      }

    default:
      return state;
  }
}

export default playlistReducer;