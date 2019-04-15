import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import mainViewReducer from './mainViewReducer'

// This is where state comes from 
export default combineReducers({
  tokenReducer,
  mainViewReducer
});