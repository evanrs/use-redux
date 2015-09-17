const React = require('react/addons');
const { Component } = React;
const { connect } = require('react-redux');
const cookie = require('cookie');

const env = {
  apiURL: '//localhost:3000'
}

class AuthDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false
    }
  }

  logout() {
    fetch(`${env.apiURL}/logout`, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'follow',
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).
    then(res => {
      debugger;
    })
  }

  validate() {
    fetch(`${env.apiURL}/auth/validate`, {credentials: 'include', mode: 'cors'}).
    then(res => this.setState({validated: true}))
  }

  fetchProfile() {
    this.setState({fetching: true});
    fetch(`${env.apiURL}/profile`, {credentials: 'include', mode: 'cors'}).
    then(res => {
      if (res.status >= 200 && res.status < 400)
        return res.json()
      else throw new Error(res.status);
    }).
    then(profile => this.setState({profile, fetching: false})).
    catch(error => this.setState({error, fetching: false}))
  }

  componentDidMount() {
    this.validate();
  }

  render() {
    let authorized;
    let {fetching, fetchError, profile, validated} = {...this.state}

    try {
      authorized = JSON.parse(cookie.parse(document.cookie).authorized) }
    catch(e) {
      authorized = false }

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
  return {auth};
}

function mapDispatch(dispatch) {
  return {dispatch}
}

module.exports = connect(mapState, mapDispatch)(AuthDemo);
