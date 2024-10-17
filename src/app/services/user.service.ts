import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserPage } from '../models/user-page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  api = `${environment.BACKEND_URL}/api/user`;

  findAll(page = 0, size = 10 ): Observable<UserPage>{
    return this.http.get<UserPage>(this.api , {params:{ page, size}});
  }
  
  constructor() { }
}
