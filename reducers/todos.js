import Immutable, {Iterable, Map, List, Record} from 'immutable';
import isNumber from 'lodash/lang/isNumber';
import matches from 'lodash/utility/matches';
import uniqueId from 'lodash/utility/uniqueId';

import actions from '../actions';


const {
  ADD_TODO, EDIT_TODO, SAVE_TODO, DRAFT_TODO, TOGGLE_TODO, REMOVE_TODO
} = actions.todos;

const ACTION_LIST = List([
  ADD_TODO, EDIT_TODO, SAVE_TODO, DRAFT_TODO, TOGGLE_TODO, REMOVE_TODO]);

const TodoRecord = Record(
  { id: 0,
    text: '',
    complete: false,
    drafting: true,
    editing: false},
  'TodoRecord'
);

const initialState = Map({
  count: 0,
  draft: new TodoRecord,
  items: List()
});

function todos(state, {type, id, text} = {}) {
  state =
    ! Iterable.isKeyed(state) ? initialState
      : Map.isMap(state) ? state
      : Immutable.fromJS(state).
          update('list', list => list.map(v => new TodoRecord(v))).
          update('draft', v => new TodoRecord(v));

  if (! ACTION_LIST.includes(type)) return state;

  let index = state.get('items').findIndex(matches({id}));

  switch(type) {
    case DRAFT_TODO:
      return state.
        update('draft', draft =>
          draft.merge({text}))

    case ADD_TODO: {
      let count = state.get('count') + 1;

      return state.
        update('items', items =>
          items.push(state.get('draft').merge({
            drafting: false,
            text: text
          }))
        ).
        set('count', count).
        set('draft', new TodoRecord({id: count}));
    }

    case EDIT_TODO:
      return state.
        update('items', items =>
          items.update(index, todo =>
            todo.set('editing', true)));

    case SAVE_TODO:
      return state.
        update('items', items =>
          items.update(index, todo =>
            todo.set('editing', false).set('text', text)));

    case TOGGLE_TODO:
      if (index >= 0)
        return state.
          update('items', items =>
            items.update(index, todo =>
              todo.set('complete', ! todo.complete)));

    case REMOVE_TODO:
      if (index >= 0)
        return state.
          update('items', items =>
            items.delete(index));

    default:
      console.error("Invalid state, undefined index", type, id, text);
  }

  return state;
}

export default todos;
