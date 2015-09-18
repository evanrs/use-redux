import { bindActionCreators } from 'redux';
const cookie = require('cookie');
const { connect } = require('react-redux');
const React = require('react/addons');
const { Component } = React;

import actions from '../actions';

const env = {
  apiURL:
    /localhost/.test(location.hostname) ?
      '//localhost:3000'
    : '//' + ['api', ...location.hostname.split('.').slice(-2)].join('.')
}

class AuthDemo extends Component {
  login() {
    if (this.state && this.state.timeout !== void 0) return;

    let listener = (event) =>
      event.origin === global.location.origin && (
        global.clearTimeout(this.state.timeout),
        this.setState({timeout: void 0}),
        this.props.actions.validate());

    global.addEventListener('message', listener);

    this.setState({
      timeout:
        setTimeout(() => (
          global.removeEventListener('message', listener),
          this.setState({timeout: void 0}),
          this.props.actions.login()), 500)
    });
  }

  render() {
    let {validated, authorized, actions} = this.props;

    return (
      <div className="authbar">
        {this.state && this.state.timeout !== void 0 &&
          <iframe ref="iframe" src={`${env.apiURL}/auth/github`} style={{display: 'none'}}/>}
        <img
          className="authbar-avatar"
          src={authorized ?
                authorized.avatar_url
              : "/static/man_silhouette.png"}
        />
        <span className="authstate ui-text">
          {authorized ?
            validated ?
              <span className="a" onClick={actions.logout}>Logout</span>
            : <span className="ui-text">• • •</span>
          : <span className="a" onClick={e => this.login()}>
              {this.state && this.state.timeout ? '• • •' : 'Login'}
            </span>
          }
          {authorized ?
            <span className="ui-text">{ authorized.displayName }</span> : ''}
        </span>
      </div>
    )
  }
}

function mapState({auth}) {
  return auth;
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions.auth, dispatch),
    dispatch
  }
}

module.exports = connect(mapState, mapDispatch)(AuthDemo);
