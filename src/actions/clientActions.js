import { REGISTER_NEW_CLIENT } from '../actions/types';

export function registerClientRequest(clientData) {
  return dispatch => {
    return fetch('/api/v1/clients', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: clientData.clientName
      })
    }).then(res => {
      if (res.status !== 201) {
        throw res.statusText;
      }
      return res.json();
    }).then(json => {
      if (!json || !json.name || !json.key || !json.secret) {
        throw new Error('Invalid response');
      }
      dispatch(registeredClient(json))
    });
  }
}

export function registeredClient(client) {
  return {
    type: REGISTER_NEW_CLIENT,
    client
  };
}
