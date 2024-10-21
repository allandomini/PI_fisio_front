import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { FormComponent } from './components/layout/form/form.component';
import { ResultComponent } from './components/layout/result/result.component';
import { AdminComponent } from './components/layout/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ExerciseManagementComponent } from './components/exercise/exercisemanagement/exercisemanagement.component';
import { UserManagementComponent } from './components/user/usermanagement/usermanagement.component';
import { LoginGoogleComponent } from '../app/components/login-google/login-google.component';
import { MainComponent } from '../app/components/main/main.component';
import { HeaderComponent } from './components/header/header.component';


export const routes: Routes = [
  { path: '', component: MainComponent,
    children:[
    {path: 'home', component: HomeComponent},
    {path: 'google', component: LoginGoogleComponent},
    { path: 'login', component: LoginComponent },
    { path: 'form', component: FormComponent },
    { path: 'result', component: ResultComponent },
  ] },
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children:[
      {path: 'exercise', component: ExerciseManagementComponent},
      {path: 'user', component: UserManagementComponent}
    ]
  },

];
