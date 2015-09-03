import findIndex from 'lodash/array/findIndex';
import result from 'lodash/object/result';
import uniqueId from 'lodash/utility/uniqueId';

import actions from './actions';

const { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } = actions.todos;
const { FILTER_NONE, FILTER_COMPLETE, FILTER_INCOMPLETE } = actions.filters;

function todos(state = [], action) {
  let id = result(action, 'todo.id');
  let index = findIndex(state, {id});

  switch (action.type) {
    case ADD_TODO:
      return id ? state : [
        { id:
            state[0] && state[0].id + 1 || 0,
            // uniqueId('todo'),
          text: action.text,
          complete: false,
          visible: true
        },
        ...state
      ];

    case TOGGLE_TODO:
      return state.
        map(todo =>
              todo.id !== action.todo.id ?
                todo : {...todo, complete: ! todo.complete});

    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.todo.id);

    case FILTER_NONE:
      return state.map(todo => ({...todo, visible: true}))

    case FILTER_COMPLETE:
      return state.map(todo => ({...todo, visible: !! todo.complete}));

    case FILTER_INCOMPLETE:
      return state.map(todo => ({...todo, visible: ! todo.complete}));

    default:
      return state;
  }
}

export default todos;
