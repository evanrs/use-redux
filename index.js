
import less from 'less';
import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

React.render(
    <Provider store={store}>
      {() => <App/>}
    </Provider>
  , document.getElementById('root'));
