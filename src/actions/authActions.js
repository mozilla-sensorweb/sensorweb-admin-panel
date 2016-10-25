import jwtDecode            from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
import { AUTH_ENDPOINT }    from './endpoints';

export function logout() {
  return dispatch => {
    localStorage.removeItem('sessionToken');
    dispatch(setCurrentUser({}));
  }
}

export function userSignInRequest(userData) {
  return dispatch => {
    const authHeader = btoa('admin:' + userData.password);
    return fetch(AUTH_ENDPOINT, {
      method: 'post',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Authorization': 'Basic ' + authHeader
      }
    }).then(res => {
      if (res.status !== 201) {
        throw res.statusText;
      }
      return res.json();
    }).then(json => {
      if (!json || !json.token) {
        throw new Error('Invalid response');
      }
      const sessionToken = json.token;
      localStorage.setItem('sessionToken', sessionToken);
      dispatch(setCurrentUser(jwtDecode(sessionToken), sessionToken));
    });
  }
}

export function setCurrentUser(user, sessionToken) {
  return {
    type: SET_CURRENT_USER,
    user,
    sessionToken
  }
}
