import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './AppProvider';
import Boot from './redux/boot';
import Home from './containers/Home';

const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route path="/">
          <Home />
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
