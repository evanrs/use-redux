import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';

import {
  FILTER_NONE,
  FILTER_COMPLETE,
  FILTER_INCOMPLETE } from '../actions/filter';

const FILTER_TITLES = {
  [FILTER_NONE]: 'all',
  [FILTER_COMPLETE]: 'complete',
  [FILTER_INCOMPLETE]: 'incomplete'
}

export default class Filter extends Component {
  render() {
    let { current, onFilter } = this.props;
    return (
      <div style={{textAlign: 'center', width: '100%', marginBottom: '1em'}}>
        {map(FILTER_TITLES, (displayName, FILTER) => (
          <a
            key={FILTER}
            href="javascript:void(0)"
            className={FILTER === current.type ? 'selected' : ''}
            onClick={event => onFilter(FILTER)}>
            {displayName}
          </a>
        ))}
      </div>
    )
  }
}
