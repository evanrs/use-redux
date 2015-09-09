import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import TodoApp from './TodoApp';

const store = require('../store')();

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <TodoApp/>}
        </Provider>
        {false && module.hot &&
          <DebugPanel top right bottom>
            <DevTools
              store={store}
              monitor={LogMonitor} />
          </DebugPanel>
        }
      </div>
    )
  }
}

export default App;
