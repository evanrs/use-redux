import pick from 'lodash/object/pick';
import matches from 'lodash/utility/matches';
import Immutable, {List, Record} from 'immutable';

import actions from '../actions';

const { ADD_TODO, DRAFT_TODO, TOGGLE_TODO, REMOVE_TODO } = actions.todos;
const ACTION_LIST = List.of(actions.todos);

const TodoRecord = Record(
  { id: 0,
    text: '',
    complete: false,
    drafting: true},
  'TodoRecord'
);

function todos(state = List(), action = {}) {
  const {type, todo, text} = action;

  if (! List.isList(state))
    state = List.of(...state).map(v => new TodoRecord(v));

  if (ACTION_LIST.find(matches(action.type)))
    return state;

  let index = state.findIndex(matches(pick(todo, 'id')));

  if (! todo) switch (type) {
    case DRAFT_TODO:
    case ADD_TODO:
      return state.push(
        new TodoRecord({
          id: state.size ? state.last().id + 1 : 0,
          drafting: DRAFT_TODO === type,
          text
        })
      )
  }

  else if (index >= 0) switch(type) {
    case DRAFT_TODO:
      return state.
        update(index, todo => todo.
          set('text', text))

    case ADD_TODO:
      return state.
        update(index, todo => todo.
          set('text', text).
          set('drafting', false));

    case TOGGLE_TODO:
      return state.
        update(index, todo => todo.
          set('complete', ! todo.complete));

    case REMOVE_TODO:
      return state.delete(index);
  }

  else {
    console.error("Invalid state, undefined index", action);
  }

  return state;
}

export default todos;
