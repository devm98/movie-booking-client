import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './AppProvider';
import CinemaContainer from './containers/cinema';
import AdminContainer from './containers/admin';
import { PrivateRoute } from './shared/routes';

const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route path="/" component={CinemaContainer} />
        <PrivateRoute path="/admin" component={AdminContainer} />
      </Switch>
    </AppProvider>
  );
};

export default App;
