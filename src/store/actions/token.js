import * as actionTypes from './actionTypes';

export const setToken = (token) => {
  return {
    type: actionTypes.SET_TOKEN,
    token
  }
}
