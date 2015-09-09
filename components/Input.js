import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  focus() {
    this.refs.input.getDOMNode().focus();
  }

  componentDidMount() {
    if (! this.state.text) {
      let input = this.refs.input.getDOMNode();
      input.setSelectionRange(input.value.length, input.value.length);
    }
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
          value={this.state.text || this.props.value}
          onChange={event => (
                      this.props.onInput(event.target.value),
                      this.setState({text: event.target.value}))}
          style={{width: '100%'}}
        />
      </form>
    )
  }
}
