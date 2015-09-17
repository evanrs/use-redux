const cookie = require('cookie');
const actions = require('../actions');

let {AUTH_VALIDATION_INIT, AUTH_VALIDATION_START, AUTH_VALIDATION_DONE} = actions.auth;

const initialState = {
  authorized: false,
  validated: false,
  validating: false
};

module.exports = function auth(state=initialState, {type, authorized}) {
  switch (type) {
    case AUTH_VALIDATION_INIT:
      return {...state, validating: false, validated: false, authorized}
    case AUTH_VALIDATION_START:
      return {...state, validating: true}
    case AUTH_VALIDATION_DONE:
      return {...state, validating: false, validated: true, authorized}

    default:
      return state;
  }
}
