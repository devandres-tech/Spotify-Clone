import * as actionTypes from '../actions/actionTypes';
import { request } from 'http';

export const browseViewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BROWSE_VIEW:
      return {
        ...state,
        title: action.title
      }

    case actionTypes.FETCH_BROWSE_CATEGORIES:
      return {
        ...state,
        data: action.payload.data.categories.items
      }

    default:
      return state;
  }
}

export default browseViewReducer;