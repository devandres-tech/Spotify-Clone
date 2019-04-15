import * as actionTypes from '../actions/actionTypes';

export const browseViewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BROWSE_VIEW:
      return {
        ...state,
        title: action.title
      }

    default:
      return state;
  }
}

export default browseViewReducer;