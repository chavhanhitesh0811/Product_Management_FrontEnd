import { Component , OnDestroy} from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product_management';

  // message: string;
  // intervalId: any;

  // constructor(
  //   private oauthService: OAuthService
  // ) { 
  //   this.message = 'Initial message';
  //   this.intervalId = setInterval(() => {
  //     this.oauthService.setupAutomaticSilentRefresh();
  //     console.log("refresh");
  //   }, 6000);
  // }
}
