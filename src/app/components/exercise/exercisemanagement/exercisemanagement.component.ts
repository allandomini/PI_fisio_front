import { Component } from '@angular/core';
import { ExerciselistComponent } from '../exerciselist/exerciselist.component';

@Component({
  selector: 'app-exercisemanagement',
  standalone: true,
  imports: [ExerciselistComponent],
  templateUrl: './exercisemanagement.component.html',
  styleUrl: './exercisemanagement.component.scss'
})
export class ExerciseManagementComponent {

}
