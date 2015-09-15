import 'babel-core/polyfill';

require('./style');

if (! localStorage.getItem('_actionHistory')) {
  localStorage.setItem('_actionHistory', JSON.stringify(require('./demo')));
}

require.ensure(['react', './containers/App'], function (require) {
  const React = require('react');
  const App = require('./containers/App');

  React.initializeTouchEvents(true);
  React.render(<App />, document.getElementById('root'));
});


