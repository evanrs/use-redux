import { ADD_TODO, REMOVE_TODO } from './actions';

function todos(state = {todos: ['howdy']}, action) {
  switch (action.type) {
    case ADD_TODO:
      return {todos: [action.text, ...state.todos]};
    case REMOVE_TODO:
      return {todos: [
        ...state.todos.slice(0, action.index),
        ...state.todos.slice(action.index + 1)
      ]}
    default:
      return state;
  }
}

export default todos;
