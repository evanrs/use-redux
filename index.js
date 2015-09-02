import 'babel-core/polyfill';
import React from 'react';

// import Root from './components/root';

class Root extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array
  }

  static defaultProps = {
    todos: []
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let style = {
      fontSize: 20,
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '100%'
    }

    return (
      <div style={style}>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.dispatch(addTodo(this.state.text));
            this.setState({text: ''});
          }}
        >
          <input
            value={this.state.text}
            onChange={event => this.setState({text: event.target.value})}
          />
        </form>
        {this.props.todos.map(todo => (
          <div>
            {todo}
            <span
              onClick={event => this.props.dispatch(removeTodo(todo))}
            >
              &nbsp;×
            </span>
          </div>
        ))}
      </div>
    )
  }
}

import {createStore} from 'redux';

function addTodo(text) {
  return {type: 'ADD_TODO', text};
}

function removeTodo(text) {
  return {type: 'REMOVE_TODO', text}
}

function todos(state = {todos: ['howdy']}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {todos: [action.text, ...state.todos]};
    case 'REMOVE_TODO':
      return {todos: state.todos.filter(todo => todo !== action.text)};
    default:
      return state;
  }
}

// function counter(state = {count: 0}, action) {
//   switch (action.type) {
//     case 'INCREMENT': return {count: state.count + 1};
//     case 'DECREMENT': return {count: state.count - 1};
//     default: return state;
//   }
// }

// function increment () {
//   return {type: 'INCREMENT'};
// }

const store = createStore(todos);

import {Provider, connect} from 'react-redux';

React.render(
    <Provider store={store}>
      {() => React.createElement(connect(state => state)(Root))}
    </Provider>
  , document.getElementById('root'));
