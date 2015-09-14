import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../actions';

class HistoryApp extends Component {

  render() {
    const { dispatch, cursor, size } = this.props;

    return (
      <div className='history-scrubber'>
        <h6>scrubber</h6>
        <input
          style={{width: '100%'}}
          ref="slider" type="range" min="0" max={size} step="1" value={size - cursor}
          onChange={e => {
            dispatch({type: '@@GOTO', cursor: size - event.target.value})
          }}
        />
      </div>
    )
  }
}

function mapState({cursor, historySize}) {
  return {cursor, size: historySize};
}

function mapDispatch(dispatch) {
  return {dispatch}
}

export default connect(mapState, mapDispatch)(HistoryApp);
