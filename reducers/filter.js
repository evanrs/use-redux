import actions from '../actions';

const { FILTER_NONE, FILTER_COMPLETE, FILTER_INCOMPLETE } = actions.filter;

const initialState = {type: FILTER_NONE, test: {}};

function filter(state=initialState, {type}) {
    switch (type) {
      case state.type:
        type = FILTER_NONE;
      case FILTER_NONE:
        return {type, test: {}};

      case FILTER_COMPLETE:
        return {type, test: {complete: true}};

      case FILTER_INCOMPLETE:
        return {type, test: {complete: false}};

      default:
        return state;
  }
}

export default filter;
