import 'babel-core/polyfill';

import React from 'react';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setClicks() {
    this.setState({
      clicks: store.getState()
    })
  }

  componentWillMount() {
    this.setClicks();
    this.unsubscribe = store.subscribe(this.setClicks.bind(this))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let style = {
      fontSize: 100,
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    return (
      <div style={style}>
        <span
          onClick={event => store.dispatch(increment())}>
          {Array(this.state.clicks + 1).fill().map(v => "💯")}
        </span>
      </div>
    )
  }
}

import {createStore} from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

const store = createStore(counter);

function increment () {
  return {type: 'INCREMENT'};
}

// import {Provider} from 'react-redux';

React.render(<Root />, document.getElementById('root'));
