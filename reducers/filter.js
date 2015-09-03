import actions from '../actions';

const { FILTER_NONE, FILTER_COMPLETE, FILTER_INCOMPLETE } = actions.filter;

const identity = v => v;
const initialState = {type: FILTER_NONE, test: identity};

function filter(state=initialState, {type}) {
    switch (type) {
      case FILTER_COMPLETE:
        return {type, test: todo => !! todo.complete};

      case FILTER_INCOMPLETE:
        return {type, test: todo => ! todo.complete};

      case FILTER_NONE:
        return {type, test: identity};

      default:
        return state;
  }
}

export default filter;
