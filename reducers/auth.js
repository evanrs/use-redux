const cookie = require('cookie');
const actions = require('../actions');

let {AUTH_VALIDATING, AUTH_VALIDATED} = actions.auth;

const initialState = {
  authorized: getAuthorizedCookie(),
  validated: false,
  validating: false
};

module.exports = function auth(state=initialState, action) {
  switch (action.type) {
    case AUTH_VALIDATING:
      return {...state, validating: true}
    case AUTH_VALIDATED:
      return {...state, validating: false, validated: true, authorized: getAuthorizedCookie()}

    default:
      return state;
  }
}

function getAuthorizedCookie() {
  try {
    return JSON.parse(cookie.parse(document.cookie).authorized) }
  catch(e) {
    return false }
}
