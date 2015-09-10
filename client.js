import 'babel-core/polyfill';

require('./style');

require.ensure(['react', './containers/App'], function (require) {
  const React = require('react');
  const App = require('./containers/App');

  React.render(<App />, document.getElementById('root'));
});


