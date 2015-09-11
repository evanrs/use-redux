import React, { Component, PropTypes } from 'react/addons';
const {CSSTransitionGroup} = React.addons;

export default class TodoItem extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({active: void 0});
  }

  render() {
    const { item, onToggle, onDelete } = this.props;

    let active =
      this.state && this.state.active !== void 0 ?
        this.state.active : item.complete;

    return (
      <div>
        <CSSTransitionGroup transitionName="todoList" transitionAppear={true}>
          <div key={item.id} className="todoitem">
            <div
              className={`check ${active ? '' : 'in'}active`}
              onClick={event => (
                this.setState({active: ! item.complete}),
                setTimeout(() => onToggle(item), 25)
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="61" height="52" viewBox="0 0 61 52" className="check-icon">
                <path d="M56.560,-0.010 C37.498,10.892 26.831,26.198 20.617,33.101 C20.617,33.101 5.398,23.373 5.398,23.373 C5.398,23.373 0.010,29.051 0.010,29.051 C0.010,29.051 24.973,51.981 24.973,51.981 C29.501,41.166 42.502,21.583 60.003,6.565 C60.003,6.565 56.560,-0.010 56.560,-0.010 Z" id="path-1" className="cls-2" fill-rule="evenodd"/>
              </svg>
            </div>
            <div className={`todoitem-text ${item.complete && 'todoitem-text__complete'}`}>
              {item.text}
            </div>
            <input
              className="todoitem-delete"
              type="button"
              value="&nbsp;×&nbsp;"
              onClick={event => onDelete(item)}
            />
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}
