import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavigationComponent from '../components/NavigationComponent/NavigationComponent';

const ProtectedRoutes = () => {
  const isUserLoggedIn = localStorage.getItem('username');

  return isUserLoggedIn ? (
    <>
      <NavigationComponent />
      <Outlet />
    </>
  ) : (
    <Navigate to="login" />
  );
};

export default ProtectedRoutes;
