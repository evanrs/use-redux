import after from 'lodash/function/after';
import throttle from 'lodash/function/throttle';
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

  start(touch) {
    if (touch) this.touch = true

    if (this.touch && ! touch) return;

    if (! this.state.scrubing) {
      this.setState({scrubing: true});
      this.props.onScrub();
    }

    global.clearInterval(this.interval);
    this.interval = global.setInterval(after(10, throttle(this.scrub, 90)), 29);
  }

  stop(touch) {
    if (this.touch && ! touch) return;

    this.setState({scrubing: false});
    global.clearInterval(this.interval);
  }

  render() {
    return (
      <span
        onMouseDown={e => this.start()}
        onMouseUp={e => this.stop()}
        onTouchStart={e => this.start(true)}
        onTouchCancel={e => this.stop(true)}
        onTouchEnd={e => this.stop(true)}
      >
        {this.props.children}
      </span>
    )
  }
}
