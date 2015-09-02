import 'babel-core/polyfill';

import React from 'react';

class Root extends React.Component {
  render() {
    let style = {
      fontSize: 100,
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '100%'
    }

    return (
      <div style={style}
           onClick={event => this.props.dispatch(increment())}>
        {Array(this.props.count + 1).fill().map(v => " 💯 ")}
      </div>
    )
  }
}

import {createStore} from 'redux';

function counter(state = {count: 0}, action) {
  switch (action.type) {
    case 'INCREMENT': return {count: state.count + 1};
    case 'DECREMENT': return {count: state.count - 1};
    default: return state;
  }
}

const store = createStore(counter);

function increment () {
  return {type: 'INCREMENT'};
}

import {Provider, connect} from 'react-redux';

React.render(
    <Provider store={store}>
      {() => React.createElement(connect(state => state)(Root))}
    </Provider>
  , document.getElementById('root'));
