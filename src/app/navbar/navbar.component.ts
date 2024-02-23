import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogged !: boolean;

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.configure();
  }

  ngOnInit(): void {
    setTimeout(() => {
      let temp = sessionStorage.getItem('access_token');
      if (temp == null) {
        this.isLogged = false;
      }
      else {
        this.isLogged = true;
      }
    }, 200);
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  logout() {
    this.oauthService.logOut();
  }

  navigateTo(page: string) {
    if (this.oauthService.getAccessTokenExpiration() < Date.now()) {
      this.oauthService.logOut();
      this.oauthService.initCodeFlow();
    }
    else {
      this.router.navigate([page]);
    }
  }
}
