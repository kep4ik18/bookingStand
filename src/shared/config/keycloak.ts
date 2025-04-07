import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://auth.stg.corp.1440.space/',
  realm: 'empaas',
  clientId: 'rack-reservation-service', 
  redirectUri: 'http://localhost:5173/*',
  // client_secret: import.meta.env.VITE_CLIENT_SECRET,
});


export default keycloak;