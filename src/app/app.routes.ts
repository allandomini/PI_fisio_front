import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { LoginComponent } from './components/layout/login/login.component';
import { FormComponent } from './components/layout/form/form.component';
import { ResultComponent } from './components/layout/result/result.component';
import { AdminComponent } from './components/layout/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ExerciseManagementComponent } from './components/exercise/exercisemanagement/exercisemanagement.component';
import { UserManagementComponent } from './components/user/usermanagement/usermanagement.component';
import { LoginGoogleComponent } from './components/layout/login-google/login-google.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'google', component: LoginGoogleComponent},
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent },
  { path: 'result', component: ResultComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children:[
      {path: 'exercise', component: ExerciseManagementComponent},
      {path: 'user', component: UserManagementComponent}
    ]
  },
  {path: '**', redirectTo: ''}
  
];
