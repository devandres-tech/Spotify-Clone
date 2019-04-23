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

export const fetchAlbumTracks = (token, albumId, albumImg) => {
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

export const fetchArtists = (token, artistIds) => {
  const request = axios.get(`/artists/?ids=${artistIds}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return {
    type: actionTypes.FETCH_ARTISTS,
    payload: request
  }
}

export const fetchArtistTracks = (token, artistId) => {
  const request = axios.get(`/artists/${artistId}/top-tracks?country=US`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return {
    type: actionTypes.FETCH_ARTIST_TRACKS,
    payload: request
  }
}
