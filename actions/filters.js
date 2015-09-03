export const FILTER_NONE = 'FILTER_NONE';
export const FILTER_COMPLETE = 'FILTER_COMPLETE';
export const FILTER_INCOMPLETE = 'FILTER_INCOMPLETE';

export function filterNone() {
  return {type: FILTER_NONE}
}

export function filterComplete() {
  return {type: FILTER_COMPLETE}
}

export function filterIncomplete() {
  return {type: FILTER_INCOMPLETE}
}
