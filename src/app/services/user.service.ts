import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  api = `${environment.BACKEND_URL}/api/user`;

  findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }
  constructor() { }
}
