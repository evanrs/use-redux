export function createHistory(namespace='_history') {
  return (next) => (reducer, initialState) => {
    let history = JSON.parse(localStorage.getItem(namespace) || '[]');
    let [previousState] = history;

    let store = next(reducer, {...initialState, ...previousState});
    let {dispatch} = store;
    let chain = [];

    return {
      ...store,
      dispatch() {
        let action = store.dispatch(...arguments);

        history = [store.getState(), ...history].slice(0, 5);

        localStorage.setItem(
          namespace, JSON.stringify(history));

        return action;
      }
    }
  }
}
