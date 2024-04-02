import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import DetailPage from './features/DetailPage/DetailPage';
import HomePage from './features/HomePage/HomePage';
import LoginPage from './features/LoginPage/LoginPage';
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
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/home',
          element: <HomePage />,
        },
        {
          path: '/posts/:postId',
          element: <DetailPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <nav>Opa</nav>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
