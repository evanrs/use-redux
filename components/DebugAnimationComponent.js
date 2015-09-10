import React, { Component } from 'react/addons';

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
