// src/keycloak.ts
import keycloakConfig from './keycloak-config';

let keycloak: any = null;

export const initKeycloak = async (): Promise<any> => {
  if (!keycloak) {
    // Dynamically import 'keycloak-js'
    const Keycloak = (await import('keycloak-js')).default;
    keycloak = new Keycloak(keycloakConfig);

    // Initialize Keycloak
    await keycloak.init({
      onLoad: 'login-required', // Can be 'login-required' or 'check-sso'
      checkLoginIframe: false,
    });
  }
  return keycloak;
};

export const getKeycloak = (): any => keycloak;
