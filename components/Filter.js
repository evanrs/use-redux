import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';

import {filters} from '../actions';
const {FILTER_NONE, FILTER_COMPLETE, FILTER_INCOMPLETE} = filters;

const FILTER_TITLES = {
  [FILTER_NONE]: 'all',
  [FILTER_COMPLETE]: 'complete',
  [FILTER_INCOMPLETE]: 'incomplete'
}

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {filter: FILTER_NONE};
  }

  onShow(filter) {
    this.setState({filter});
    this.props.onShow(filter);
  }

  render() {
    return (
      <footer>
        {map(FILTER_TITLES, (name, filter) => (
          <a
            href="javascript:void(0)"
            style={{
              fontSize: 12,
              display: 'inline',
              marginRight: '1em',
              textDecoration: filter === this.state.filter ? 'underline' : ''
            }}
            onClick={event => this.onShow(filter)}>
            {name}
          </a>
        ))}
      </footer>
    )
  }
}
