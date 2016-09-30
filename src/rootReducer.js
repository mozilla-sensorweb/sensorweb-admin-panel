import { combineReducers } from 'redux';

import auth          from './reducers/auth';
import clients       from './reducers/clients';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
  auth,
  clients,
  flashMessages
});
