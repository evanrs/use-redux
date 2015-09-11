export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const DRAFT_TODO = 'DRAFT_TODO';

export function draftTodo(todo, text) {
  return catchEmpty(todo, text) ||
    {type: DRAFT_TODO, todo, text};
}

export function addTodo(todo, text) {
  return catchEmpty(todo, text) ||
    {type: ADD_TODO, todo, text};
}

export function toggleTodo (todo) {
  return {type: TOGGLE_TODO, todo}
}

export function removeTodo(todo) {
  return {type: REMOVE_TODO, todo}
}

function catchEmpty(todo, text = '') {
  return (
    text.replace(/\s/g, '').length === 0 ?
        todo ? removeTodo(todo) : {type: DRAFT_TODO, todo, text}
    : false
  )
}
