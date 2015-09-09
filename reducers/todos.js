import result from 'lodash/object/result';
import Immutable, {List, Record} from 'immutable';

import actions from '../actions';

const { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } = actions.todos;

const TodoRecord = Record(
  { id: 0,
    text: '',
    complete: false},
  'TodoRecord'
);

function todos(state = List(), action = {}) {
  const {type, todo, text} = action;

  if (! List.isList(state)) {
    state = List.of(...state).map(v => TodoRecord(v));
  }

  let id = result(todo, 'id');
  let index = state.findIndex(todo => id === todo.id);

  switch (type) {
    case ADD_TODO:
      let last = state.last();

      return state.push(
        new TodoRecord({
          id: last ? last.id + 1 : 0,
          text
        })
      );

    case TOGGLE_TODO:
      return (
        index >= 0 ?
          state.update(index, todo => todo.set('complete', ! todo.complete))
        : state
      );

    case REMOVE_TODO:
      return state.delete(index);

    default:
      return state;
  }
}

export default todos;
