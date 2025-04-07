import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";

import { loginSuccess } from "../features/auth/model/authSlice";
import { useKeycloak } from "@react-keycloak/web";


export default function App() {
  const { keycloak } = useKeycloak();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (keycloak?.authenticated && keycloak?.token) {
      console.log('🔥 Token:', keycloak.token); // Токен из Keycloak
      dispatch(loginSuccess(keycloak.token)); // Сохраняем в redux/store
    }
  }, [keycloak?.token]);

  
  return (
    <RouterProvider router={router} />
  )
}
