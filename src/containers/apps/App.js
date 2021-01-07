import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import { Footer, Header } from '../../shared/common';
import { PrivateRoute } from '../../shared/routes';
import { useDispatch, useSelector } from 'react-redux';
import MovieScreen from '../movieScreen';
import Auditorium from '../movieScreen/auditorium';
import LoginScreen from '../loginScreen';
import authAction from '../../state/actions/auth';
import Payment from '../movieScreen/payment';

const App = withRouter(({ location }) => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state?.auth?.idToken);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isLoggedIn !== null) {
      setIsAuth(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(authAction.checkAuthorization());
  }, [dispatch]);

  return (
    <div>
      {location.pathname !== '/login' && <Header />}
      <Switch>
        <Route exact path={path} component={MovieScreen} />
        <PrivateRoute
          isAuth={isAuth}
          path={`${path}seat-select/:id`}
          component={Auditorium}
        />
        <PrivateRoute
          isAuth={isAuth}
          path={`${path}payment`}
          component={Payment}
        />
        <Route path={`${path}login`} component={LoginScreen} />
      </Switch>
      <Footer />
    </div>
  );
});
export default App;
