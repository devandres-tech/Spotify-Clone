import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import mainViewReducer from './mainViewReducer';
import browseViewReducer from './browseViewReducer';

// This is where state comes from 
export default combineReducers({
  tokenReducer,
  mainViewReducer,
  browseViewReducer
});