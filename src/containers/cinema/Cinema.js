import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { Header } from '../../shared/common';
import { PrivateRoute } from '../../shared/routes';
import authAction from '../../core/state/actions/auth';
import LoginScreen from './loginScreen/LoginScreen';
import MovieScreen from './movieScreen';
import Auditorium from './movieScreen/auditorium';
import Payment from './movieScreen/payment';

const Cinema = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let { path } = useRouteMatch();

  useEffect(() => {
    dispatch(authAction.checkAuthorization());
  }, [dispatch]);

  return (
    <div>
      {location.pathname !== '/login' && <Header />}
      <Switch>
        <Route exact path="/" component={MovieScreen} />
        <PrivateRoute path={`${path}seat-select/:id`} component={Auditorium} />
        <PrivateRoute path={`${path}payment`} component={Payment} />
        <Route path={`${path}login`} component={LoginScreen} />
      </Switch>
    </div>
  );
};

export default Cinema;
