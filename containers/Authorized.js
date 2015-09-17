const React = require('react/addons');
const { Component } = React;

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');
import actions from '../actions';

class Authorized extends Component {
  componentWillMount() {
    this.props.dispatch(actions.auth.initialize());
  }

  componentDidMount() {
    this.validate(this.props);
  }

  componentWillReceiveProps(props) {
    this.validate(props);
  }

  validate(props) {
    if (! props.validated && ! props.validating)
      props.dispatch(actions.auth.validate());
  }

  render() {
    let {validating, validated, authorized, children} = this.props;
    return <span>{validated && authorized && children}</span>;
  }
}


function mapState({auth}) {
  return auth;
}

module.exports = connect(mapState)(Authorized);
