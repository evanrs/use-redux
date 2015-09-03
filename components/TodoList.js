import React, { Component, PropTypes } from 'react';

import TodoItem from './TodoItem';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array,
    onToggle: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    todos: []
  }

  render() {
    return (
      <div>
        {this.props.active.map(item => <TodoItem {...{...this.props, item}}/>)}
        <hr style={{margin: '1em', border: 'none', height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.25)'}}/>
        {this.props.disabled.map(item => <TodoItem {...{...this.props, item}}/>)}
      </div>
    )
  }
}
