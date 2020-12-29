import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './AppProvider';
import Boot from './state/redux/boot';
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

Boot()
  .then(() => App())
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

export default App;
