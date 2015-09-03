import findIndex from 'lodash/array/findIndex';
import result from 'lodash/object/result';
import uniqueId from 'lodash/utility/uniqueId';

import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions';

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
          complete: false
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

    default:
      return state;
  }
}

export default todos;
