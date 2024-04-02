import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isUserLoggedIn = localStorage.getItem('username');

  return isUserLoggedIn ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoutes;
