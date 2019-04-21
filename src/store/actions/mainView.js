import * as actionTypes from './actionTypes';

export const updateTitle = (title) => {
  return {
    type: actionTypes.UPDATE_TITLE,
    title
  }
}

export const updateSongListView = (title) => {
  return {
    type: actionTypes.UPDATE_SONG_LIST_VIEW,
    title
  }
}