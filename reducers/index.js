import Immutable, {Map} from 'immutable';
import forEach from 'lodash/collection/forEach';
import mapValues from 'lodash/object/mapValues';

import filter from './filter';
import todos from './todos';

const reducers = {
  filter,
  todos
}

function mutableCombinator(state = {}, action) {
  return {
    ...state,
    ...mapValues(reducers, (reducer, key) => reducer(state[key], action))
  }
}

function immutableCombinator(state = Map(), action) {
  if (! Map.isMap(state)) {
    state = Map(state);
  }

  return (
    state.withMutations((state) =>
      forEach(
        reducers, (reducer, key) =>
          state.set(
            key, reducer(state.get(key), action, state))))
    // Because redux-devtools can only take a plain object :-(
    .toObject()
  )
}

export default immutableCombinator
