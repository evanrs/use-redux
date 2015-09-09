import React, { Component } from 'react';

import {createHistory} from './store/history';
import { createStore, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import reducers from './reducers';

const createCustomStore =
  compose(...[
      createHistory(),
      applyMiddleware(thunk),
      // module.hot && devTools(),
      // module.hot && persistState(
      //                 window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ].filter(x => x)
  )(createStore)
;

export default function configure() {
  const store = createCustomStore(reducers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
