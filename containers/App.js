import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import TodoApp from './TodoApp';
import Boo from '../components/Boo';
import reducers from '../reducers';

const store =
  compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )
  (createStore)
  (combineReducers({todos: reducers}))
;

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers'))
  )
}

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <TodoApp/>}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools
            store={store}
            monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}

export default App;
