export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export function addTodo(text) {
  return {type: ADD_TODO, text};
}

export function removeTodo(index) {
  return {type: REMOVE_TODO, index}
}
