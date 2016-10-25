import { GET_CLIENTS_LIST, REGISTER_NEW_CLIENT } from './types';
import { CLIENTS_ENDPOINT }                      from './endpoints';

function getClients(sessionToken) {
  return fetch(CLIENTS_ENDPOINT, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer ' + sessionToken
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 304) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(clients => {
    if (!clients || !Array.isArray(clients)) {
      throw new Error('Invalid response');
    }
    return clients;
  });
}

export function getClientsRequest() {
  return (dispatch, getState) => {
    return getClients(getState().auth.sessionToken).then(clients => {
      dispatch(gotClientsList(clients));
    });
  }
}

export function gotClientsList(clients) {
  return {
    type: GET_CLIENTS_LIST,
    clients
  }
}

export function registerClientRequest(clientData) {
  return (dispatch, getState) => {
    let client;
    const sessionToken = getState().auth.sessionToken;
    return fetch(CLIENTS_ENDPOINT, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionToken
      },
      body: JSON.stringify({
        name: clientData.clientName
      })
    }).then(res => {
      if (res.status !== 201) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(json => {
      if (!json || !json.name || !json.key || !json.secret) {
        throw new Error('Invalid response');
      }
      client = json;
      return getClients(sessionToken);
    }).then(clients => {
      if (!clients || !Array.isArray(clients)) {
        throw new Error('Invalid response');
      }
      dispatch(registeredClient(client, clients));
    });
  }
}

export function registeredClient(client, clients) {
  return {
    type: REGISTER_NEW_CLIENT,
    client,
    clients
  };
}

export function removeClientRequest(clientKey) {
  return (dispatch, getState) => {
    const sessionToken = getState().auth.sessionToken;
    return fetch(CLIENTS_ENDPOINT + '/' + clientKey, {
      method: 'delete',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + sessionToken
      }
    }).then(res => {
      if (res.status !== 204) {
        throw new Error(res.statusText);
      }
      return getClients(sessionToken);
    }).then(clients => {
      dispatch(gotClientsList(clients));
    });
  }
}
