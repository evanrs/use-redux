import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import { createHistory } from './action-history';
// import { createHistory } from './history';
import reducers from '../reducers';

const createCustomStore =
  compose(...[
      applyMiddleware(thunk),
      createHistory(),
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
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
