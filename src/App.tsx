import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import DetailPage from './features/DetailPage/DetailPage';
import ErrorBoundary from './features/ErrorBoundary/ErrorBoundary';
import HomePage from './features/HomePage/HomePage';
import LoginPage from './features/LoginPage/LoginPage';
import NotFoundPage from './features/NotFoundPage/NotFoundPage';
import SettingsPage from './features/SettingsPage/SettingsPage';
import ProtectedRoutes from './routes/ProtectedRoutes';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="home" />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'posts/:postId',
          element: <DetailPage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        },
      ],
    },
  ]);

  return (
    <ThemeContextProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeContextProvider>
  );
};

export default App;
