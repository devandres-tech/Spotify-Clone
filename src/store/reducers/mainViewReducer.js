import * as actionTypes from '../actions/actionTypes';

export const mainViewReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TITLE:
      console.log("title in reducer", action.title)
      return {
        ...state,
        title: action.title
      }

    default:
      return state;
  }
}

export default mainViewReducer;