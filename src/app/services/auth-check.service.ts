import { Injectable } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  message?: string;
  intervalId: any;
  constructor(private oauthService: OAuthService) { }

  checkValidity() {
    if (this.oauthService.getAccessTokenExpiration() < Date.now()) {
      this.oauthService.logOut();
      this.oauthService.initCodeFlow();
    }
  }
}
