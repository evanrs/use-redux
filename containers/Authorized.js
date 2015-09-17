const React = require('react/addons');
const { Component } = React;

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');


class Authorized extends Component {
  render() {
    let {validating, validated, authorized, children} = this.props;
    return <span>{! validating && validated && authorized && children}</span>;
  }
}


function mapState({auth}) {
  return auth;
}

module.exports = connect(mapState)(Authorized);
