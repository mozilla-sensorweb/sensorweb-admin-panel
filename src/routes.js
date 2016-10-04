import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Clients from './components/clients/Clients';
import SignIn from './components/signin/SignIn';
import Users from './components/users/Users';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Clients} />
    <Route path="clients" component={Clients} />
    <Route path="users" component={Users} />
    <Route path="signin" component={SignIn} />
  </Route>
)
