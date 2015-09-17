import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

const identity = (x) => x;

export function createHistory(volatile = identity, namespace='_actionHistory') {
  return (next) => (reducer, initialState) => {
    initialState = reducer(initialState, {cursor: 0});

    let history = JSON.parse(localStorage.getItem(namespace) || '[]');
    let futureState = history.reduceRight(reducer, initialState) || {};

    function historyReducer (state, action) {
      let cursor = state.cursor || 0;
      let historySize = history.length;

      switch (action.type) {
        case '@@GOTO':
          cursor = action.cursor;
          return history.
            slice(cursor).
            reduceRight(reducer, {...initialState, cursor, historySize})

        case '@@UNDO':
          cursor = cursor < history.length ? cursor + 1 : cursor;
          return history.
            slice(cursor).
            reduceRight(reducer, {...initialState, cursor, historySize})

        case '@@REDO':
          cursor = cursor > 0 ? cursor - 1 : 0;
          return history.
            slice(cursor).
            reduceRight(reducer, {...initialState, cursor, historySize})

        default:
          return [action, ...history.slice(cursor)].
            reduceRight(reducer, {...initialState, cursor, historySize});
      }
    }

    let store = next(historyReducer, futureState);

    let dispatch = (action) => {
      store.dispatch(action);

      let cursor = store.getState().cursor || 0;

      if (! /@@(UNDO|REDO|GOTO)$/.test(action.type)) {
        let past = history.slice(cursor).
          filter(past => ! volatile(action, past));
        let future = history.slice(0, cursor).
          filter(future => ! volatile(action, future));

        history = [...future, action, ...past];
      }

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

    Mousetrap.bindGlobal('ctrl+esc', event => {
      event.preventDefault();
      console.log(JSON.stringify(store.getState(), null, 4 ), JSON.stringify(history, null, 4))
    });

    return {...store, dispatch}
  }
}
