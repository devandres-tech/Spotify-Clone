import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const fetchFeaturedTracks = (token, playlistId) => {
  const request = axios.get(`/playlists/${playlistId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    type: actionTypes.FETCH_FEATURED_TRACKS,
    payload: request
  }
}
