import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions';

let id = 0;

function todos(state = {todos: []}, action) {
  let index = state.todos.indexOf(action.todo);

  switch (action.type) {
    case ADD_TODO:
      return {todos: [
        { id: `todo-${id++}`,
          text: action.text,
        },
        ...state.todos
      ]};

    case TOGGLE_TODO:
      return {todos: [
        ...state.todos.slice(0, index),
        {
          ...action.todo,
          complete: ! action.todo.complete
        },
        ...state.todos.slice(index + 1)
      ]}

    case REMOVE_TODO:
      return {todos: [
        ...state.todos.slice(0, index),
        ...state.todos.slice(index + 1)
      ]}

    default:
      return state;
  }
}

export default todos;
