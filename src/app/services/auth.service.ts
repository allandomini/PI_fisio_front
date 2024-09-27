import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/enviroment';
import { AuthDTO } from '../models/auth-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BACKEND_URL;
  private readonly access_token = 'access_token';
  private readonly refresh_token = 'refresh_token';

  constructor(private http: HttpClient) { }

  public getAuthorizationHeader(): HttpHeaders {
    const authToken = this.getAccessToken();
    return new HttpHeaders({ Authorization: `JWT ${authToken}` });
  }

  private getAccessToken(){
    return localStorage.getItem(this.access_token);
  }
  private getRefreshToken(){
    return localStorage.getItem(this.refresh_token);
  }

  public getAuth(): AuthDTO {
    return new AuthDTO(
      this.getAccessToken() || '',
      this.getRefreshToken() || ''
    );
  }

  public setAuthToken(authDTO: AuthDTO): void {
    localStorage.setItem(this.access_token, authDTO.accessToken);
    localStorage.setItem(this.refresh_token, authDTO.refreshToken);
  }

  /**
   * Social login for Google specifically
   * @param id_token Token gotten from first step social google auth
   * @returns HttpClient `Observable`
   */

  logar(idToken: string): Observable<AuthDTO> {
    console.log('ID token from Google: ', idToken)
    const payload = {
      "idToken": idToken
    }
    return this.http.post<AuthDTO>(`${this.apiUrl}/auth/login`,payload, {responseType: 'json'});
  }



  public socialLogin(id_token: string) {
    console.log('ID token from Google: ', id_token)
    const loginUrl = `${this.apiUrl}/auth/login`;
        const payload = {
      "idToken": id_token
    }
    return this.http.post(loginUrl, payload, {responseType: 'text' as 'json'}).pipe(
      tap((res: any) => {
        console.log('res = ', res)
        const access_token = res;
        if(access_token){
            localStorage.setItem('access_token', access_token); //MUITO IMPORTANTE
          }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  logout() {
    return localStorage.clear();
  }

}
