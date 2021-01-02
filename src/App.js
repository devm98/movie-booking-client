import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './AppProvider';
import AppContainer from './containers/apps';

const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route path="/">
          <AppContainer />
        </Route>
      </Switch>
    </AppProvider>
  );
};

export default App;
