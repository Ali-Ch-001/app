import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {useAuth } from './authcontext.js'; // Adjust the path as needed

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
