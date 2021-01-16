import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import CinemaContainer from './containers/cinema';
import AdminContainer from './containers/admin';
import authActions from './state/actions/auth';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.checkAuthorization());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={CinemaContainer} />
      <Route path="/admin" component={AdminContainer} />
      {/* <Route component={CinemaContainer} /> */}
      <Route component={AdminContainer} />
    </Switch>
  );
};

export default App;
