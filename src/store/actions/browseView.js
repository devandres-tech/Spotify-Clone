import * as actionTypes from './actionTypes';

export const updateBrowseView = (title) => {
  return {
    type: actionTypes.UPDATE_BROWSE_VIEW,
    title
  }
}
