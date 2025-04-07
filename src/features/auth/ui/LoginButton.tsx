import { useKeycloak } from '@react-keycloak/web';
import { useAppSelector } from '../../../app/store/hooks';


export const LoginButton = () => {
  const { keycloak } = useKeycloak();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => keycloak.login()}>Login</button>
      ) : (
        <button onClick={() => keycloak.logout()}>Logout</button>
      )}
    </div>
  );
};