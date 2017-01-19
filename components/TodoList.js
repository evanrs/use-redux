import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import matches from 'lodash/matches';

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
    let {items, filter, filter: {test}} = this.props;

    items = items.reverse();
    test = x => matches(filter.test)(x);

    let active = items.filter(test);
    let disabled = items.filterNot(test);

    return (
      <div>
        <CSSTransitionGroup
            transitionName="todoList"
            transitionAppear={true}
            transitionAppearTimeout={150}
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}>

          {active.map(this.renderItem)}

          <div key="rule" className="rule">
            <hr/>
          </div>

          {disabled.map(this.renderItem)}
        </CSSTransitionGroup>
      </div>
    )
  }

  renderItem = (item) =>
    <TodoItem key={item.id} {...{...this.props, item}}/>
}
