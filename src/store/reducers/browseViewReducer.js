import * as actionTypes from '../actions/actionTypes';

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
        categories: action.payload.data.categories.items
      }

    case actionTypes.FETCH_CATEGORY_PLAYLIST:
      return {
        ...state,
        categoryPlaylist: action.payload.data.playlists.items
      }

    case actionTypes.FETCH_FEATURED_PLAYLIST:
      return {
        ...state,
        featured: action.payload.data.playlists.items
      }

    case actionTypes.FETCH_NEW_RELEASES_PLAYLIST:
      return {
        ...state,
        newReleases: action.payload.data.albums.items
      }

    default:
      return state;
  }
}

export default browseViewReducer;