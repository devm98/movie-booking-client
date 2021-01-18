import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AdminPrivateRoute } from '../../shared/routes';
import AdminLogin from './adminLogin';
import Dashboard from './dashboard/Dashboard';

function Admin(props) {
  const { path } = useRouteMatch();

  const { adminLoginHandler } = props;

  return (
    <Switch>
      <AdminPrivateRoute exact path="/" component={Dashboard} />
      <Route
        path={`${path}/login`}
        render={() => <AdminLogin adminLoginHandler={adminLoginHandler} />}
      />
      <AdminPrivateRoute component={Dashboard} />
    </Switch>
  );
}

export default Admin;
