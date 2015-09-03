import actions from '../actions';

const { FILTER_NONE, FILTER_COMPLETE, FILTER_INCOMPLETE } = actions.filter;

const identity = v => v;
const filterComplete = todo => !! todo.complete;
const filterIncomplete = todo => ! todo.complete;

const initialState = {type: FILTER_NONE, test: identity};

function filter(state=initialState, {type}) {
    if (! state.test) {
      type = state.type;
    }

    switch (type) {
      case state.type:
        type = FILTER_NONE;
      case FILTER_NONE:
        return {type, test: identity};

      case FILTER_COMPLETE:
        return {type, test: todo => !! todo.complete};

      case FILTER_INCOMPLETE:
        return {type, test: todo => ! todo.complete};

      default:
        return state;
  }
}

export default filter;
