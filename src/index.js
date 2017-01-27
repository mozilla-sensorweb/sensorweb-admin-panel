import './css/custom.css';
import '../node_modules/react-select/dist/react-select.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './rootReducer';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import routes from './routes';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const sessionToken = localStorage.sessionToken;
if (sessionToken) {
  store.dispatch(setCurrentUser(jwtDecode(sessionToken), sessionToken));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app'));
