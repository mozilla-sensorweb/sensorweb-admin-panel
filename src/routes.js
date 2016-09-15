import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Clients from './components/clients/Clients';
import Main from './components/Main';
import Sensors from './components/sensors/Sensors';
import SignIn from './components/signin/SignIn';
import Users from './components/users/Users';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="clients" component={Clients} />
    <Route path="sensors" component={Sensors} />
    <Route path="signin" component={SignIn} />
    <Route path="users" component={Users} />
  </Route>
)
