import result from 'lodash/object/result';
import Immutable, {List, Record} from 'immutable';

import actions from '../actions';

const { ADD_TODO, DRAFT_TODO, TOGGLE_TODO, REMOVE_TODO } = actions.todos;

const TodoRecord = Record(
  { id: 0,
    text: '',
    complete: false,
    drafting: true},
  'TodoRecord'
);

function todos(state = List(), action = {}) {
  const {type, todo, text} = action;

  if (! List.isList(state)) {
    state = List.of(...state).map(v => new TodoRecord(v));
  }

  let id = result(todo, 'id');
  let index = state.findIndex(todo => id === todo.id);

  switch (type) {
    case DRAFT_TODO:
      return index >= 0 ?
        state.update(index, todo => todo.set('text', text))
      : state.push(
          new TodoRecord({
            id: state.size ? state.last().id + 1 : 0,
            text
          })
        )
      ;

    case ADD_TODO:
      return state.update(index, todo => todo.set('drafting', false));

    case TOGGLE_TODO:
      return state.update(index, todo => todo.set('complete', ! todo.complete));

    case REMOVE_TODO:
      return state.delete(index);

    default:
      return state;
  }
}

export default todos;
