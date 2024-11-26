import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthDTO } from '../../../models/auth-dto';
import { UserService } from '../../../services/user.service';
import { SelectionService } from '../../../services/selection.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MdbFormsModule,
  ],
  providers: [MdbModalService], // Adiciona o serviço aqui
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss'],
})
export class LoginGoogleComponent implements OnInit {
  userName: string = '';
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private selectionService: SelectionService,
    private userService: UserService,
    private socialAuth: SocialAuthService,
    private authService: AuthService,
    private route: Router,
    private modalService: MdbModalService
  ) {}

  openModal(): void {
    this.modalRef = this.modalService.open(ModalComponent);
  }

  ngOnInit() {
    this.socialAuth.authState.subscribe((res: any) => {
      const userName = res.name;
      console.log('Nome do usuário que logou com o Google: ', userName);
      localStorage.setItem('userName', userName);

      this.authService.login(res.idToken).subscribe({
        next: (auth: AuthDTO) => {
          console.log('AccessToken: ', auth.accessToken);
          console.log('RefreshToken: ', auth.refreshToken);
          this.authService.setAuthToken(auth);
          this.userService.getInfo().subscribe({
            next: (user) => {
              if (user.jointIntensities && user.jointIntensities?.length > 0) {
                this.selectionService.setJointIntensities(user.jointIntensities);
                this.openModal();
              } else {
                this.route.navigate(['/login/userinfo']);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
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
