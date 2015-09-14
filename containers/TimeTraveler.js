import React, { Component } from 'react';
const {CSSTransitionGroup} = React.addons;
import { connect } from 'react-redux';

import actions from '../actions';

class HistoryApp extends Component {

  render() {
    const { dispatch, cursor, size } = this.props;

    return (
      <CSSTransitionGroup className='history-scrubber' transitionName="history-scrubber" transitionAppear={true}>
      <div>
          <h6>scrubber</h6>
          <input
            style={{width: '100%'}}
            ref="slider" type="range" min="0" max={size} step="1" value={size - cursor}
            onChange={e => {
              dispatch({type: '@@GOTO', cursor: size - event.target.value})
            }}
          />
      </div>
      </CSSTransitionGroup>
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
