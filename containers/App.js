import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { Provider } from 'react-redux';
import TodoApp from './TodoApp';
import TimeTraveler from './TimeTraveler';
import { AppContainer } from 'react-hot-loader';

import createStore from  '../store';

const store = createStore();

class App extends Component {
  render() {
    return (
      <AppContainer>

        <Provider store={store}>
        <div>
          <CSSTransitionGroup
              transitionName="app"
              transitionAppear={true}
              transitionAppearTimeout={350}
              transitionEnterTimeout={350}
              transitionLeaveTimeout={350}>
            <TodoApp/>
          </CSSTransitionGroup>
          <TimeTraveler/>
        </div>
        </Provider>
      </AppContainer>
    )
  }
}

export default App;
