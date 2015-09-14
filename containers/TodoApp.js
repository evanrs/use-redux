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
    const { actions, dispatch, draft, items, filter } = this.props;
    const { text, id } = draft || {};

    return (
      <div style={TodoApp.style}>
        <div className="jumbotron">
          <h1>todo</h1>
        </div>
        <Input
          value={text}
          onInput={(text='') => actions.draftTodo(id, text)}
          onSubmit={(text='') => {
            actions.draftTodo(id, text);
            text.length && actions.addTodo(id, text)
          }}
        />
        <div style={{textAlign: 'center', width: '100%', marginBottom: '1em'}}>
          <Scrub onScrub={e => dispatch({type: '@@UNDO'})}>
            <span className="a scrub scrub-left">❮</span>
          </Scrub>
          <Filter current={filter} onFilter={type => dispatch({type})}/>
          <Scrub onScrub={e => dispatch({type: '@@REDO'})}>
            <span className="a scrub scrub-right">❯</span>
          </Scrub>
        </div>
        <TodoList
          items={items}
          filter={filter}
          onEdit={actions.editTodo}
          onSave={actions.saveTodo}
          onToggle={actions.toggleTodo}
          onDelete={actions.removeTodo}
        />
      </div>
    )
  }
}

function mapState({todos, filter}) {
  let draft = todos.get('draft');
  let items = todos.get('items');

  return {
    draft,
    items,
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
