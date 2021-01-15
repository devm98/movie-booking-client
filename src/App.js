import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './AppProvider';
import CinemaContainer from './containers/cinema';
import AdminContainer from './containers/admin';

const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={CinemaContainer} />
        <Route path="/admin" component={AdminContainer} />
        <Route component={CinemaContainer} />
      </Switch>
    </AppProvider>
  );
};

export default App;
