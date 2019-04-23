import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import mainViewReducer from './mainViewReducer';
import browseViewReducer from './browseViewReducer';
import playlistReducer from './playlistReducer';
import userReducer from './userReducer';
import playerControlsReducer from './playerControlsReducer';

export default combineReducers({
  tokenReducer,
  mainViewReducer,
  browseViewReducer,
  playlistReducer,
  userReducer,
  playerControlsReducer
});