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
  componentDidMount() {
    this.props.actions.validate()
  }

  render() {
    let {validated, authorized} = this.props;

    return (
      <div className="authbar">
        <img
          className="authbar-avatar"
          src={authorized ?
                authorized.avatar_url
              : "/static/man_silhouette.png"}
        />
        <span className="authstate ui-text">
          {authorized ?
            validated ?
              <a href={`${env.apiURL}/logout`}>
                Logout
              </a>
            : <span className="ui-text">…</span>
          : <a href={`${env.apiURL}/auth/github`}>Login</a>
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
