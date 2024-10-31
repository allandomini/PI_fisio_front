import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { FormComponent } from './components/layout/form/form.component';
import { ResultComponent } from './components/layout/result/result.component';
import { AdminComponent } from './components/layout/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ExerciseManagementComponent } from './components/exercise/exercisemanagement/exercisemanagement.component';
import { UserManagementComponent } from './components/user/usermanagement/usermanagement.component';
import { MainComponent } from '../app/components/main/main.component';
import { FormIntensidadeComponent } from './components/layout/form-intensidade/form-intensidade.component';
import { UserInfoLoginComponent } from './components/login/user-info-login/user-info-login.component';
import { MainLoginComponent } from './components/login/main-login/main-login.component';
import { LoginGoogleComponent } from './components/login/login-google/login-google.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'form', component: FormComponent },
      { path: 'result', component: ResultComponent },
      { path: 'form-intensidade', component: FormIntensidadeComponent },
      { path: 'login', component: MainLoginComponent, children:
        [
          { path: '', component: LoginGoogleComponent },
          { path: 'userinfo', component: UserInfoLoginComponent },
        ]},
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'exercise', component: ExerciseManagementComponent },
      { path: 'user', component: UserManagementComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
