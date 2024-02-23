import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthCheckService } from '../services/auth-check.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private authCheckService: AuthCheckService
  ) { }

  check(navigatePage: string): void {
    if (this.oauthService.getAccessTokenExpiration() < Date.now()) {
      this.oauthService.logOut();
      this.oauthService.initCodeFlow();
    }
    else {
      this.router.navigate([navigatePage]);
    }
  }
}
