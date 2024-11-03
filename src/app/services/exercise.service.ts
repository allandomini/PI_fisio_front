import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { Exercise, Intensity, Joint } from '../models/exercise';
import { Observable } from 'rxjs';
import { ExercisePage } from '../models/exercise-page';
import { ExerciseFilterDTO } from '../models/exercise-filter-dto';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  http = inject(HttpClient);
  api = `${environment.BACKEND_URL}/api/exercise`;

  // Existing methods

  findAll(
    page = 0,
    size = 10,
    exercise: ExerciseFilterDTO
  ): Observable<ExercisePage> {
    const params: any = { page, size };

    if (exercise.name && exercise.name.length > 0) {
      params.name = exercise.name;
    }
    if (exercise.joints && exercise.joints.length > 0) {
      params.joints = exercise.joints.join(',');
    }
    if (exercise.intensities && exercise.intensities.length > 0) {
      params.intensities = exercise.intensities.join(',');
    }

    return this.http.get<ExercisePage>(this.api, { params });
  }

  save(exercise: Exercise): Observable<any> {
    return this.http.post(this.api, exercise, { responseType: 'json' });
  }

  update(exercise: Exercise, id: number) {
    return this.http.put(`${this.api}/${id}`, exercise, {
      responseType: 'text',
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`, { responseType: 'text' });
  }

  // New method to fetch exercises by joint and intensity
  findByJointAndIntensity(
    joint: string,
    intensity: string
  ): Observable<Exercise[]> {
    const url = `${this.api}/findByJointAndIntensity`;
    const params = {
      joint: joint,
      intensity: intensity.toUpperCase(),
    };

    return this.http.get<Exercise[]>(url, { params });
  }

  getExercisesByJointAndIntensity(joint: Joint, intensity: Intensity): Observable<ExerciseFilterDTO[]> {
    return this.http.get<ExerciseFilterDTO[]>(`${this.api}/findByJointAndIntensity?joint=${joint}&intensity=${intensity}`);
  }

  constructor() {}
}
