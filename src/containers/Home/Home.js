import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import { Footer, Header } from '../../Shared/common';
import Booking from '../Booking';
import Movies from '../Movies';
import SignIn from '../SignIn';
import { PrivateRoute } from '../../Shared/routes';
import { useSelector } from 'react-redux';

const Home = withRouter(({ location }) => {
  let { path } = useRouteMatch();
  const isLoggedIn = useSelector((state) => state?.auth?.idToken);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuth(true);
    }
  }, [isLoggedIn]);

  return (
    <div>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Header />
      )}
      <Switch>
        <Route exact path={path} component={Movies} />
        <PrivateRoute
          isAuth={isAuth}
          path={`${path}booking`}
          component={Booking}
        />
        <Route path={`${path}login`} component={SignIn} />
      </Switch>
      <Footer />
    </div>
  );
});
export default Home;
