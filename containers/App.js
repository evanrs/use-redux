import React, { Component } from 'react/addons';
const {CSSTransitionGroup} = React.addons;

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import TodoApp from './TodoApp';
import TimeTraveler from './TimeTraveler';
import AuthDemo from './AuthDemo';

const store = require('../store')();

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <AuthDemo/>}
        </Provider>
        <CSSTransitionGroup transitionName="app" transitionAppear={true}>
          <Provider store={store}>
            {() => <TodoApp/>}
          </Provider>
        </CSSTransitionGroup>
        <Provider store={store}>
          {() => <TimeTraveler/>}
        </Provider>
      </div>
    )
  }
}

export default App;
