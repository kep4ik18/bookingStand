import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../app/Layout';
import { LoginPage } from '../pages/LoginPage';
import { BookingPage } from '../pages/BookingPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../shared/lib/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute allowedStatuses={['logged']} redirectTo="/login" />,
        children: [
          {
            path: '/',
            element: <BookingPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);