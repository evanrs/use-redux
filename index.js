import less from 'less';

import 'babel-core/polyfill';
import React from 'react';

import Input from './components/Input';
import TodoList from './components/TodoList';

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
        <div className="jumbotron">
          <h1>todo</h1>
        </div>
        <Input
          onSubmit={(event, text) => this.props.dispatch(addTodo(text))}
        />
        <TodoList
          todos={this.props.todos}
          onComplete={(event, index) => this.props.dispatch(removeTodo(index))}
        />
      </div>
    )
  }
}

import {createStore} from 'redux';

function addTodo(text) {
  return {type: 'ADD_TODO', text};
}

function removeTodo(index) {
  return {type: 'REMOVE_TODO', index}
}

function todos(state = {todos: ['howdy']}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {todos: [action.text, ...state.todos]};
    case 'REMOVE_TODO':
      return {todos: [
        ...state.todos.slice(0, action.index),
        ...state.todos.slice(action.index + 1)
      ]}
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
