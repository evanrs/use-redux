import 'babel-core/polyfill';

import React from 'react';

import App from './containers/App';

require.ensure('./static/style.less', function (require) {
  require('./static/style.less');

  React.render(<App />, document.getElementById('root'));
});


