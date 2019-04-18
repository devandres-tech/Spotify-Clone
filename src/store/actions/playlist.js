import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const fetchPlaylistTracks = (token, playlistId) => {
  const request = axios.get(`/playlists/${playlistId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  return {
    type: actionTypes.FETCH_PLAYLIST_TRACKS,
    payload: request
  }
}

export const fetchAlbumTracks = (token, albumId) => {
  const request = axios.get(`/albums/${albumId}/tracks`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return {
    type: actionTypes.FETCH_ALBUM_TRACKS,
    payload: request
  }
}

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
