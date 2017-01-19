import React, { Component } from 'react';

class DebugAnimationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {toggle: true};
    const toggleState = () => this.setState({toggle: ! this.state.toggle})
    global.setInterval(() => {
      toggleState()
      global.setTimeout(toggleState, 30)
    }, 2000);

    var render = this.render;
    this.render = () => this.state.toggle ? render() : <span/>;
  }
}

export default DebugAnimationComponent;

export class ToggleAnimationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {_toggleAnimation: true, ...this.state};

    this._render = this.render;
    this.render = this.toggleAnimationRender;

    this._toggleAnimationInterval = global.setInterval(() => {
      this.toggleAnimationToggle();
      global.setTimeout(this.toggleAnimationToggle.bind(this), 300)
    }, 2000);
  }

  componentWillUnmount() {
    global.clearInterval(this._toggleAnimationInterval)
  }

  toggleAnimationToggle() {
    this.setState({_toggleAnimation: ! this.state._toggleAnimation})
  }

  toggleAnimationRender() {
    return this.state._toggleAnimation ? this._render() : <span/>;
  }
}
