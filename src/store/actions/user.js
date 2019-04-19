import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchRecentlyPlayed = (token) => {
  const request = axios.get(`/me/player/recently-played`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return {
    type: actionTypes.FETCH_RECENTLY_PLAYED_TRACKS,
    payload: request,
  }
}

export const fetchUserTracks = (token) => {
  const request = axios.get('/me/tracks', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return {
    type: actionTypes.FETCH_USER_TRACKS,
    payload: request
  }
}
