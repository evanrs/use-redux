export const AUTH_VALIDATING = 'AUTH_VALIDATING';
export const AUTH_VALIDATED = 'AUTH_VALIDATED';

const env = {
  apiURL:
    /localhost/.test(location.hostname) ?
      '//localhost:3000'
    : '//' + ['api', ...location.hostname.split('.').slice(-2)].join('.')
}

export function validate() {
  return (dispatch, getState) => {
    dispatch({type: AUTH_VALIDATING});
    fetch(
      `${env.apiURL}/auth/validate`, {credentials: 'include', mode: 'cors'}).
      then(res =>
        dispatch({type: AUTH_VALIDATED}))
  }
}
