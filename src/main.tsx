import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import { store } from "./app/store/store";
import App from "./app/App";
import keycloak from "./shared/config/keycloak";


console.log(keycloak.token);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: "login-required",
        checkLoginIframe: false,
      }}
      >
      <Provider store={store}>
        <App />
      </Provider>
    </ReactKeycloakProvider>
  </StrictMode>
);

// keycloak
//   .init({
//     onLoad: 'login-required',
//     pkceMethod: 'S256', 
//   })
//   .then((authenticated: any) => {
//     if (!authenticated) {
//       console.log('не авторизован');
//     }

//     console.log("token", keycloak.token);
//   })
//   .catch(console.error);