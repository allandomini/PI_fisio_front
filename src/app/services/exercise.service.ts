import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  http = inject(HttpClient);
  api = `${environment.BACKEND_URL}/api/exercise`;

  findAll(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(this.api);
  }

  save(exercise: Exercise){
    return this.http.post(this.api,exercise, { responseType: 'text' } );
  }

  update(exercise: Exercise, id: number){
    return this.http.put(`${this.api}/${id}`, exercise, { responseType: 'text' });
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`,  { responseType: 'text' });
  }
  constructor() { }
}
