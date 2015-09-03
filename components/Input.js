import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  focus() {
    this.refs.input.getDOMNode().focus();
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.onSubmit(this.state.text);
          this.setState({text: ''});
        }}
      >
        <input
          ref="input"
          type="text"
          value={this.state.text}
          onChange={event => this.setState({text: event.target.value})}
          style={{width: '100%'}}
        />
      </form>
    )
  }
}
