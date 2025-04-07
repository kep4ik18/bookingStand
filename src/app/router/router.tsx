import { createBrowserRouter } from 'react-router-dom';




import { LoginPage } from '../../pages/login/LoginPage';
import { ProtectedRoute } from './ProtectedRouter';
import { Layout } from '../../pages/layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MainPage from '../../pages/main/MainPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

      {
        path: '/',
        element: <MainPage />,
      },
      // {
      //   path: '/',
      //   element: <ProtectedRoute allowedStatuses={['logged']} redirectTo="/login" />,
      //   children: [
      //     {
      //       path: '/',
      //       element: <MainPage />,
      //     },
      //   ],
      // },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage/>,
      },
    ],
  },
]);