import {
  GET_CLIENTS_LIST,
  GET_PERMISSIONS,
  REGISTER_NEW_CLIENT
} from './types';
import { CLIENTS_ENDPOINT, PERMISSIONS_ENDPOINT } from './endpoints';

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

function getPermisions(sessionToken) {
  return fetch(PERMISSIONS_ENDPOINT, {
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
  }).then(response => {
    const permissions = response.permissions;
    if (!permissions || !Array.isArray(permissions)) {
      throw new Error('Invalid response');
    }
    return permissions;
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

export function getPermissionsRequest() {
  return (dispatch, getState) => {
    return getPermisions(getState().auth.sessionToken).then(permissions => {
      dispatch(gotPermissions(permissions));
    });
  };
}

export function gotPermissions(permissions) {
  return {
    type: GET_PERMISSIONS,
    permissions
  };
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
        name: clientData.clientName,
        authRedirectUrls: clientData.authRedirectUrls,
        authFailureRedirectUrls: clientData.authFailureRedirectUrls,
        permissions: clientData.permissions
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
