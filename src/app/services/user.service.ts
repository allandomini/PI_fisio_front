import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserPage } from '../models/user-page';
import { JsonPipe } from '@angular/common';
import { ExerciseFilterDTO } from '../models/exercise-filter-dto';
import { Intensity, Joint } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private api = `${environment.BACKEND_URL}/api/user`;

  findAll(page = 0, size = 10 ): Observable<UserPage>{
    return this.http.get<UserPage>(this.api , {params:{ page, size}});
  }
  patchUpdate(user: User): Observable<User>{
    return this.http.patch<User>(this.api, user, {responseType: 'json'});
  }

  
  
  
  constructor() { }
}
