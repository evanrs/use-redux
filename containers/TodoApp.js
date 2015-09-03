import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../components/Input';
import TodoList from '../components/TodoList';

import * as todoActions from '../actions';

class TodoApp extends Component {
  static style = {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%'
  }

  render() {
    const { actions, todos } = this.props;

    return (
      <div style={TodoApp.style}>
        <div
          className="jumbotron"
          style={{transform: 'translateY(-100%)', marginBottom: '-25%'}}>
          <h1>todo</h1>
        </div>
        <Input
          onSubmit={actions.addTodo}
        />
        <TodoList
          todos={todos}
          onComplete={actions.toggleTodo}
          onDelete={actions.removeTodo}
        />
      </div>
    )
  }
}

function mapState(state) {
  return {
    todos: state.todos
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(TodoApp);
