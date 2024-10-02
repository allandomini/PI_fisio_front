import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { LoginComponent } from './components/layout/login/login.component';
import { FormComponent } from './components/layout/form/form.component';
import { ResultComponent } from './components/layout/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent },
  { path: 'result', component: ResultComponent },
];
