import * as actionTypes from './actionTypes';

export const updateTitle = (title) => {
  return {
    type: actionTypes.UPDATE_TITLE,
    title
  }
}