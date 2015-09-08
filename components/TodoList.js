import React, { Component, PropTypes } from 'react/addons';
const {CSSTransitionGroup} = React.addons;

import matches from 'lodash/utility/matches';

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
    let {list, filter, filter: {test}} = this.props;

    list = list.reverse();
    test = x => matches(filter.test)(x);

    let active = list.filter(test);
    let disabled = list.filterNot(test);

    return (
      <div>
        <CSSTransitionGroup transitionName="todoList" transitionAppear={true}>
          {active.map(item => <TodoItem key={item.id} {...{...this.props, item}}/>)}
          <div key="rule" className="rule" style={{padding: 16}}>
            <hr style={{margin: 0, border: 'none', maxHeight: 4, height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.25)'}}/>
          </div>
          {disabled.map(item => <TodoItem key={item.id} {...{...this.props, item}}/>)}
        </CSSTransitionGroup>
      </div>
    )
  }
}

