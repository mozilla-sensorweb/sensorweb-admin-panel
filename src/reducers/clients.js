import { REGISTER_NEW_CLIENT } from '../actions/types';

const initialState = {
  lastRegisteredClient: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_NEW_CLIENT:      
      return {
        lastRegisteredClient: action.client
      };
    default:
      return state;
  }
}
