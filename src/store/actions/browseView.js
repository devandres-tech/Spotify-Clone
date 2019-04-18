import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const updateBrowseView = (title) => {
  return {
    type: actionTypes.UPDATE_BROWSE_VIEW,
    title
  }
}

export const fetchBrowseCategories = (token) => {
  const request = axios.get('/browse/categories', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    type: actionTypes.FETCH_BROWSE_CATEGORIES,
    payload: request
  }
}

export const fetchFeaturedPlaylist = (token) => {
  const request = axios.get('/browse/featured-playlists', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    type: actionTypes.FETCH_FEATURED_PLAYLIST,
    payload: request
  }
}
