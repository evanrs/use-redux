const cookie = require('cookie');
const throttle = require('lodash/function/throttle');

export const AUTH_VALIDATION_INIT = 'AUTH_VALIDATION_INIT';
export const AUTH_VALIDATION_START = 'AUTH_VALIDATION_START';
export const AUTH_VALIDATION_DONE = 'AUTH_VALIDATION_DONE';

const env = {
  apiURL:
    /localhost/.test(location.hostname) ?
      '//localhost:3000'
    : '//' + ['api', ...location.hostname.split('.').slice(-2)].join('.')
}

export function initialize() {
  return {type: AUTH_VALIDATION_INIT, authorized: getAuthorizedCookie()}
}

export function login() {
  let popup =
    global.open(
      `${env.apiURL}/auth/github`
    , 'Login'
    , 'location=0,status=0,width=960,height=720');

  return dispatch => {
    if (popup) {
      let interval =
        global.setInterval(
          () => popup.closed && (
            global.clearInterval(interval), dispatch(validate())), 50);
    }
    else global.location.href = `${env.apiURL}/auth/github`
  }
}

export function logout() {
  let request =
    fetch(
      `${env.apiURL}/logout`
    , { credentials: 'include'
      , headers: {'X-Requested-With': 'XMLHttpRequest'}
      , mode: 'cors'}
    );

  return dispatch => request.then(res => dispatch(validate()));
}

export function validate() {
  return (dispatch, getState) => {
    if (getState().auth.validating)
      return;

    dispatch({type: AUTH_VALIDATION_START});

    fetchValidation(dispatch);
  }
}

const fetchValidation =
  throttle(dispatch =>
    fetch(
      `${env.apiURL}/auth/validate`
    , { credentials: 'include', mode: 'cors' }).
    then(res =>
      dispatch({
        type: AUTH_VALIDATION_DONE
      , authorized: getAuthorizedCookie()}))
, 500
);

function getAuthorizedCookie() {
  try {
    return JSON.parse(cookie.parse(document.cookie).authorized) }
  catch(e) {
    return false }
}
