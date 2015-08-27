import 'babel-core/polyfill';

import React from 'react';

class Root extends React.Component {
  render() {
    let style = {
      fontSize: 100,
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    return (
      <div style={style}>
        💯
      </div>
    )
  }
}

React.render(<Root />, document.getElementById('root'));
