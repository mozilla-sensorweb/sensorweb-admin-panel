import { GET_CLIENTS_LIST, REGISTER_NEW_CLIENT } from '../actions/types';

const initialState = {
  lastRegisteredClient: null,
  clientList: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_NEW_CLIENT:
      return Object.assign({}, state, {
        lastRegisteredClient: action.client,
        clientList: action.clients
      });
    case GET_CLIENTS_LIST:
      return Object.assign({}, state, {
        clientList: action.clients
      });
    default:
      return state;
  }
}
