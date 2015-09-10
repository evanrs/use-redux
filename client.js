import 'babel-core/polyfill';

require('./static/style.less');

require.ensure(['react', './containers/App'], function (require) {
  const React = require('react');
  const App = require('./containers/App');

  React.render(<App />, document.getElementById('root'));
});


