import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../components/Input';
import TodoList from '../components/TodoList';
import Filter from '../components/Filter';

import actions from '../actions';

class TodoApp extends Component {
  static style = {
    maxWidth: 320,
    margin: '0 auto'
  }

  render() {
    const { actions, dispatch, todos, filter } = this.props;

    return (
      <div style={TodoApp.style}>
        <div className="jumbotron">
          <h1>todo</h1>
        </div>
        <Input
          onSubmit={actions.addTodo}
        />
        <TodoList
          todos={todos.filter(filter.test)}
          onComplete={actions.toggleTodo}
          onDelete={actions.removeTodo}
        />
        <Filter current={filter} onFilter={type => dispatch({type})}/>
      </div>
    )
  }
}

function mapState(state) {
  return {
    todos: state.todos,
    filter: state.filter
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions.todos, dispatch),
    dispatch
  }
}

export default connect(mapState, mapDispatch)(TodoApp);
