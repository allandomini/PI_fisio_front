import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { AuthDTO } from '../models/auth-dto';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  let token = localStorage.getItem('access_token');
  if (
    token &&
    !router.url.endsWith('/login') &&
    (!request.url.includes('/auth/refreshToken') || router.url.includes('/login/userinfo'))
){
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // tratar erro 401
          const refresh_token = authService.getRefreshToken() || '';
          // SE der erro 401, e o refreshtoken no localstorage for valido:
        if(authService.jwtDecode(refresh_token)){
          authService.refresh(refresh_token).subscribe({
              next: a  => {
                authService.setAuthToken({accessToken: a.accessToken, refreshToken: a.refreshToken});
                window.location.reload()
              },
              error: err =>{
                authService.logout();
                router.navigate(['/login']);
                console.log('Error while trying to get refreshtoken by refresh method')
              }
            })
          }
        } else if (err.status === 403) {
          alert('403 - tratar aqui');
		  router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }
		
		
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
