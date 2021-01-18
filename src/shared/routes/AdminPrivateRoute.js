import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useRouteMatch } from 'react-router-dom';

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  let hasToken = useSelector((state) => state?.auth?.idToken);

  const { url } = useRouteMatch();

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
              pathname: `${url}/login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
