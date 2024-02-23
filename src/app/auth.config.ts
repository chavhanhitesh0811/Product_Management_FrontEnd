import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment'

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  redirectUri: environment.redirectUri,
  postLogoutRedirectUri: environment.postLogoutRedirectUri, 
  clientId: environment.clientId,
  dummyClientSecret : environment.dummyClientSecret,
  responseType: 'code',
  strictDiscoveryDocumentValidation: true,
  scope: 'openid profile email offline_access',
}