import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let hasToken = useSelector((state) => state?.auth?.idToken);

  const renderingPrivateRouter = () => {
    if (hasToken !== null) {
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        renderingPrivateRouter() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
