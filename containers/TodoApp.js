import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import difference from 'lodash/array/difference';
import debounce from 'lodash/function/debounce';

import Input from '../components/Input';
import TodoList from '../components/TodoList';
import Filter from '../components/Filter';
import Scrub from '../components/Scrub';

import actions from '../actions';

class TodoApp extends Component {
  static style = {
    maxWidth: 320,
    margin: '0 auto'
  }

  render() {
    const { actions, dispatch, draft, list, filter } = this.props;

    return (
      <div style={TodoApp.style}>
        <div className="jumbotron">
          <h1>todo</h1>
        </div>
        <Input
          value={draft ? draft.text : ''}
          onInput={text => actions.draftTodo(draft, text)}
          onSubmit={() => actions.addTodo(draft)}
          ref={input => input && input.focus()}
        />
        <div style={{textAlign: 'center', width: '100%', marginBottom: '1em'}}>
          <Scrub onScrub={e => dispatch({type: '@@UNDO'})}>
            <a href="javascript:void(0)">&nbsp;❮&nbsp;&nbsp;&nbsp;&nbsp;</a>
          </Scrub>
          <Filter current={filter} onFilter={type => dispatch({type})}/>
          <Scrub onScrub={e => dispatch({type: '@@REDO'})}>
            <a href="javascript:void(0)">&nbsp;&nbsp;&nbsp;&nbsp;❯&nbsp;</a>
          </Scrub>
        </div>
        <TodoList
          list={list}
          filter={filter}
          onToggle={actions.toggleTodo}
          onDelete={actions.removeTodo}
        />
      </div>
    )
  }
}

function mapState({todos, filter}) {
  const [draftIndex, draft] = todos.findEntry(todo => todo.drafting) || [];
  const list = draft ? todos.splice(draftIndex, 1) : todos;

  return {
    draft,
    list,
    filter
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions.todos, dispatch),
    dispatch
  }
}

export default connect(mapState, mapDispatch)(TodoApp);
