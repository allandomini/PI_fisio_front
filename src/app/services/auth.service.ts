import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/enviroment';
import { AuthDTO } from '../models/auth-dto';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BACKEND_URL;
  private readonly access_token = 'access_token';
  private readonly refresh_token = 'refresh_token';

  constructor(private http: HttpClient) { 


  }

  public getAccessToken(){
    return localStorage.getItem(this.access_token);
  }
  public getRefreshToken(){
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

  login(idToken: string): Observable<AuthDTO> {
    console.log('ID token from Google: ', idToken)
    const payload = {
      "idToken": idToken
    }
    return this.http.post<AuthDTO>(`${this.apiUrl}/auth/login`,payload, {responseType: 'json'});
  }

  refresh(refreshToken: string): Observable<AuthDTO>{{}
  const token = this.getRefreshToken();
  const payload = {
    "refreshToken": token
  }
  return this.http.post<AuthDTO>(`${this.apiUrl}/auth/refreshToken`,payload, {responseType: 'json'});

  }

  logout() {
    localStorage.removeItem(this.access_token)
    localStorage.removeItem(this.refresh_token)

    // return localStorage.clear();
  }

  jwtDecode(token: string){
    if(token){
      return jwtDecode<JwtPayload>(token)
    }else
    return ""
  }

  hasPermission(role: String){
    let user = this.jwtDecode(this.getAccessToken() || '') as User;
    // console.log(user)
    if(user.role == role)
      return true
    else
      return false
  }
}
