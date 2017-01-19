import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';

export default class Input extends Component {
  componentWillMount() {
    this.onInput = debounce(() => this.props.onInput(this.state.value), 185);
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.onInput.cancel();
    this.setState({value: props.value});
  }

  componentDidMount() {
    this.handleUpdate();
  }

  componentDidUpdate() {
    this.handleUpdate();
  }

  handleUpdate() {
    // Move caret to end of string on text replace
    if (this.state.value === this.props.value) {
      let input = this.input;
      let caret = input.value.length;
      if (caret > 0 && input.selectionStart === 0) {
        input.setSelectionRange(caret, caret);
      }
    }
  }

  focus() {
    this.input.focus();
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          this.onInput.cancel();
          this.props.onSubmit(this.state.value);
        }}
      >
        <input
          ref={(elm) => this.input = elm}
          type="text"
          value={this.state.value}
          onChange={event => {
            event.preventDefault();
            event.stopPropagation();
            let {value} = event.target;

            // Record on every word
            ! /\b$/.test(value) && ! /\s\s+$/.test(value) ?
              this.props.onInput(value) : this.onInput(value);

            this.setState({value});
          }}
          style={{width: '100%'}}
        />
      </form>
    )
  }
}
