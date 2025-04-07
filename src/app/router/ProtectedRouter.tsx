import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


interface ProtectedRouteProps {
  allowedStatuses: string[];
  redirectTo: string;
}

export const ProtectedRoute = ({ allowedStatuses, redirectTo }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const status = isAuthenticated ? 'logged' : 'not-logged';
  const isAllowed = allowedStatuses.includes(status);

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};