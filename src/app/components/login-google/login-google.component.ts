import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { AuthDTO } from '../../../app/models/auth-dto';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginComponent } from '../login/login.component';
import { appConfig } from '../../../app/app.config';

@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MdbFormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'] 
})
export class LoginGoogleComponent implements OnInit {
  constructor(
    private socialAuth: SocialAuthService,
    private authService: AuthService,
    private route: Router
  ) {
    authService.logout();
  }

  ngOnInit() {
    this.socialAuth.authState.subscribe((res: any) => {
      this.authService.login(res.idToken)
        .subscribe({
          next: (auth: AuthDTO) => {
            console.log('AccessToken: ', auth.accessToken);
            console.log('RefreshToken: ', auth.refreshToken);
            this.authService.setAuthToken(auth);
            this.route.navigate(['/login']);
          },
          error: (error: any) => {
            console.log("Something ain't right!", `The error is: ${error.error.message}`);
          }
        });
    });
  }
}
