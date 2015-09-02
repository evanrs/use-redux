import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.onSubmit(event, this.state.text);
          this.setState({text: ''});
        }}
      >
        <input
          type="text"
          value={this.state.text}
          onChange={event => this.setState({text: event.target.value})}
        />
      </form>
    )
  }
}
