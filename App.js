import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Input from './components/Input';
import TodoList from './components/TodoList';

import { addTodo, toggleTodo, removeTodo } from './actions';

class App extends Component {
  static style = {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%'
  }

  constructor(props) {
    super(props);

    this.props.dispatch(addTodo('Feed the cat'));
    this.props.dispatch(addTodo('Feed the dog'));
    this.props.dispatch(addTodo("Don't feed the dragon!"));
  }

  render() {
    const { dispatch, todos } = this.props;

    return (
      <div style={App.style}>
        <div
          className="jumbotron"
          style={{transform: 'translateY(-100%)', marginBottom: '-25%'}}>
          <h1>todo</h1>
        </div>
        <Input
          onSubmit={(event, text) => dispatch(addTodo(text))}
        />
        <TodoList
          todos={todos}
          onComplete={(event, todo) => dispatch(toggleTodo(todo))}
          onDelete={(event, todo) => dispatch(removeTodo(todo))}
        />
      </div>
    )
  }
}

export default connect(state => state)(App);

