export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const DRAFT_TODO = 'DRAFT_TODO';

export function draftTodo(id, text) {
  return {type: DRAFT_TODO, id, text};
}

export function addTodo(id, text) {
  return {type: ADD_TODO, id, text};
}

export function toggleTodo (id) {
  return {type: TOGGLE_TODO, id}
}

export function removeTodo(id) {
  return {type: REMOVE_TODO, id}
}
