import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getAccessToken;

  if(token != null){
    if( authService.hasPermission('ADMIN')){
      return true;  // Allow access
    }
  }
    //Redireciona pro login se nao tiver permissao
    router.navigate(['/login']); 
    return false; // Deny access
};
