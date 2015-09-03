export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export function addTodo(text) {
  return {type: ADD_TODO, text};
}

export function toggleTodo (todo) {
  return {type: TOGGLE_TODO, todo}
}

export function removeTodo(todo) {
  return {type: REMOVE_TODO, todo}
}
