import { GET_CLIENTS_LIST, REGISTER_NEW_CLIENT } from '../actions/types';

function getClients() {
  return fetch('/api/v1/clients', {
    method: 'get',
    mode: 'cors'
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
  return dispatch => {
    return getClients().then(clients => {
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
  return dispatch => {
    let client;
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
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(json => {
      if (!json || !json.name || !json.key || !json.secret) {
        throw new Error('Invalid response');
      }
      client = json;
      return getClients();
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
  return dispatch => {
    return fetch('/api/v1/clients/' + clientKey, {
      method: 'delete',
      mode: 'cors'
    }).then(res => {
      if (res.status !== 204) {
        throw new Error(res.statusText);
      }
      return getClients();
    }).then(clients => {
      dispatch(gotClientsList(clients));
    });
  }
}
