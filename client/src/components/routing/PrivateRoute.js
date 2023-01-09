import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext.js';
// import Spinner from '../../components/layout/Spinner.js';

const PrivateRoute = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  // const { isAuthenticated, loading } = authContext;
  const { isAuthenticated } = authContext;
  // if (loading) return <Spinner />;
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
