export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const DRAFT_TODO = 'DRAFT_TODO';

export function draftTodo(todo, text) {
  if (! text || ! text.length)
    return removeTodo(text);

  return {type: DRAFT_TODO, todo, text};
}

export function addTodo(todo) {
  return {type: ADD_TODO, todo};
}

export function toggleTodo (todo) {
  return {type: TOGGLE_TODO, todo}
}

export function removeTodo(todo) {
  return {type: REMOVE_TODO, todo}
}
