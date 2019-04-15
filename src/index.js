import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from "react-router-dom";

import App from './containers/App';
import './static/sass/style.scss';
import reducers from './store/reducers';

// Create redux store
const storeWithMiddleWare = applyMiddleware(promise)(createStore);
const app = (
  <Provider store={storeWithMiddleWare(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

