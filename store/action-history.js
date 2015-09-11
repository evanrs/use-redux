import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

export function createHistory(namespace='_actionHistory') {
  return (next) => (reducer, initialState) => {
    initialState = reducer(initialState, {cursor: 0});

    let history = JSON.parse(localStorage.getItem(namespace) || '[]');
    let futureState = history.reduceRight(reducer, initialState) || {};

    function historyReducer (state, action) {
      let cursor = state.cursor || 0;

      switch (action.type) {
        case '@@UNDO':
          cursor = cursor < history.length ? cursor + 1 : cursor;
          return history.
            slice(cursor).
            reduceRight(reducer, {...initialState, cursor})

        case '@@REDO':
          cursor = cursor > 0 ? cursor - 1 : 0;
          return history.
            slice(cursor).
            reduceRight(reducer, {...initialState, cursor})

        default:
          return [action, ...history.slice(cursor)].
            reduceRight(reducer, {...initialState, cursor});
      }
    }

    let store = next(historyReducer, futureState);

    let dispatch = (action) => {
      store.dispatch(action);

      let cursor = store.getState().cursor || 0;

      if (! /@@(UN|RE)DO$/.test(action.type))
        history = [
          ...history.slice(0, cursor), action, ...history.slice(cursor)];

      localStorage.setItem(
        namespace, JSON.stringify(history.slice(cursor, 1000)));

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
