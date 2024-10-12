import { Component } from '@angular/core';
import { ExerciselistComponent } from '../exerciselist/exerciselist.component';


@Component({
  selector: 'app-exercisecrud',
  standalone: true,
  imports: [ExerciselistComponent],
  templateUrl: './exercisecrud.component.html',
  styleUrl: './exercisecrud.component.scss'
})
export class ExercisecrudComponent {}
