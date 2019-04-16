import axios from 'axios';

/** base url instance */
const instance = axios.create({
  baseURL: "https://api.spotify.com/v1"
});

export default instance;