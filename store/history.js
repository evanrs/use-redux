import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

export function createHistory(namespace='_history') {
  return (next) => (reducer, initialState) => {
    let history = JSON.parse(localStorage.getItem(namespace) || '[]');
    let [previousState] = history;

    function historyReducer (state, action) {
      let cursor = state.cursor || 0;

      switch (action.type) {
        case '@@UNDO':
          cursor = cursor < history.length ? cursor + 1 : cursor;
          return reducer({...history[cursor], cursor}, action);

        case '@@REDO':
          cursor = cursor > 0 ? cursor - 1 : 0;
          return reducer({...history[cursor], cursor}, action);

        default:
          history = history.slice(cursor);
          cursor = 0;
          return reducer({...state, cursor}, action);
      }
    }

    let store = next(historyReducer, {...initialState, ...previousState});
    let dispatch = (action) => {
      action = store.dispatch(action);

      let state = store.getState();

      if (! /@@(UN|RE)DO$/.test(action.type))
        history = [state, ...history];

      localStorage.setItem(
        namespace,
        JSON.stringify(
          history.slice(state.cursor, 100)));

      return action;
    }

    Mousetrap.bindGlobal('command+z', event => {
      event.preventDefault();
      dispatch({type: '@@UNDO'})
    });

    Mousetrap.bindGlobal('shift+command+z', event => {
      event.preventDefault();
      dispatch({type: '@@REDO'})
    });

    return {...store, dispatch}
  }
}
