import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthDTO } from '../../../models/auth-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private socialAuth: SocialAuthService, private authService: AuthService, private route: Router) { 
    authService.logout();
  }
  
  ngOnInit() {
    this.socialAuth.authState.subscribe((res: any) => {
      this.authService.login(res.idToken)
        .subscribe({
          next: (auth: AuthDTO) => {
            console.log('AccessToken: ', auth.accessToken)
            console.log('RefreshToken: ', auth.refreshToken)
            this.authService.setAuthToken(auth)
            this.route.navigate(['/form'])
          },
          error: (error: any) => {
            console.log("Something ain't right!", `The error is: ${error.error.message}`)
          }
        })
    });
  }
}
