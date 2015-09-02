import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Input from './components/Input';
import TodoList from './components/TodoList';

import { addTodo, removeTodo } from './actions';

class App extends Component {
  static style = {
    fontSize: 20,
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%'
  }

  render() {
    const { dispatch, todos } = this.props;
    return (
      <div style={App.style}>
        <div className="jumbotron">
          <h1>todo</h1>
        </div>
        <Input
          onSubmit={(event, text) => dispatch(addTodo(text))}
        />
        <TodoList
          todos={todos}
          onComplete={(event, index) => dispatch(removeTodo(index))}
        />
      </div>
    )
  }
}

export default connect(state => state)(App);

