import after from 'lodash/function/after';
import debounce from 'lodash/function/debounce';
import React, { Component, PropTypes } from 'react';

export default class Scrub extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.scrub = this.scrub.bind(this);
  }

  scrub() {
    this.state.scrubing ?
      this.props.onScrub() : global.clearInterval(this.interval);
  }

  start() {
    this.props.onScrub();
    this.setState({scrubing: true});
    this.interval = global.setInterval(after(10, this.scrub), 30);
  }

  stop() {
    this.setState({scrubing: false});
    global.clearInterval(this.interval);
  }

  render() {
    return (
      <span onMouseDown={e => this.start()} onMouseUp={e => this.stop()}>
        {this.props.children}
      </span>
    )
  }
}
