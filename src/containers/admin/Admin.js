import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AdminPrivateRoute } from '../../shared/routes';
import AdminLogin from './adminLogin';
import Dashboard from './dashboard/Dashboard';

function Admin() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AdminPrivateRoute exact path="/" component={Dashboard} />
      <Route path={`${path}/login`} component={AdminLogin} />
      <AdminPrivateRoute component={Dashboard} />
    </Switch>
  );
}

export default Admin;
