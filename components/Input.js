import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/function/debounce';

export default class Input extends Component {
  focus() {
    this.refs.input.getDOMNode().focus();
  }

  componentDidMount() {
    this.handleUpdate();
  }

  componentDidUpdate() {
    this.handleUpdate();
  }

  handleUpdate() {
    let input = this.refs.input.getDOMNode();
    let caret = input.value.length;

    if (caret > input.selectionStart)
      input.setSelectionRange(input.value.length, input.value.length);
  }

  render() {
    let onInput = debounce(this.props.onInput, 25);

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          this.props.onSubmit(event.target.value);
        }}
      >
        <input
          ref="input"
          type="text"
          value={this.props.value}
          onChange={event => {
            event.preventDefault();
            event.stopPropagation();
            this.props.onInput(event.target.value)
          }}
          style={{width: '100%'}}
        />
      </form>
    )
  }
}
