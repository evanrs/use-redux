require('./style');

if (! localStorage.getItem('_actionHistory') ||
    /reset/g.test(location.search)) {
  localStorage.setItem('_actionHistory', JSON.stringify(require('./demo')));
}

Promise.all([
  import('react'),
  import('react-dom'),
  import('react-tap-event-plugin'),
  import('./containers/App')
]).then(([React, ReactDOM, injectTapEventPlugin, { default: App }]) => {
  injectTapEventPlugin();

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root'));
})
