import React, { Component, PropTypes } from 'react';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static style = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 100
  }

  static propTypes = {
    todos: PropTypes.array,
    onComplete: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    todos: []
  }

  render() {
    return (
      <div>
        {this.props.todos.map((todo, index) => (
          <div style={TodoList.style}>
            <div style={{flex: 0.7}}>{todo}</div>
            <input
              type="button"
              value="&nbsp;×&nbsp;"
              onClick={event => this.props.onComplete(event, index)}/>
          </div>
        ))}
      </div>
    )
  }
}
