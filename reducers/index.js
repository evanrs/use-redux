import { combineReducers } from 'redux';

import filter from './filter';
import todos from './todos';

const reducer = combineReducers({
  filter,
  todos
});

export default reducer;
