import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from '../services/auth-check.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(
    private router: Router,
    private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    // login/logout check
    // this.authCheckService.checkValidity();
  }

  goToDashboard(profile: string) {
    if (this.oauthService.getAccessTokenExpiration() < Date.now()) {
      this.oauthService.logOut();
      this.oauthService.initCodeFlow();
    }
    else {
      if (profile == 'admin') {
        this.router.navigate(['admin-dashboard']);
      } else {
        this.router.navigate(['customer-dashboard']);
      }
    }
  }
}
