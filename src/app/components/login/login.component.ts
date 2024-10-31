import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AuthService } from '../../../app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthDTO } from '../../../app/models/auth-dto';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MdbFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  userName: string = '';

  constructor(
    private socialAuth: SocialAuthService,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    const nome = localStorage.getItem('userName');
    if (nome) {
      this.userName = nome; //vai trazer o nome do usuário pro input
    }

    this.socialAuth.authState.subscribe((res: any) => {
      this.authService.login(res.idToken).subscribe({
        next: (auth: AuthDTO) => {
          console.log('AccessToken: ', auth.accessToken);
          console.log('RefreshToken: ', auth.refreshToken);
          this.authService.setAuthToken(auth);
          this.route.navigate(['/form']);
        },
        error: (error: any) => {
          console.log(
            "Something ain't right!",
            `The error is: ${error.error.message}`
          );
        },
      });
    });
  }
}
