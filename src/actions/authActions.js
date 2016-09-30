import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from '../actions/types';

export function logout() {
  return dispatch => {
    localStorage.removeItem('sessionToken');
    dispatch(setCurrentUser({}));
  }
}

export function userSignInRequest(userData) {
  return dispatch => {
    const authHeader = btoa('admin:' + userData.password);
    return fetch('/api/v1/users/auth', {
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
      localStorage.setItem('sessionToken', json.token);
      dispatch(setCurrentUser(jwtDecode(json.token)));
    });
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}
