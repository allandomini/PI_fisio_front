import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { Exercise, Intensity, IntensityPTBR, Joint, JointPTBR } from '../../../models/exercise';
import { ExercisedetailsComponent } from '../exercisedetails/exercisedetails.component';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ExerciseService } from '../../../services/exercise.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-exerciselist',
  standalone: true,
  imports: [ExercisedetailsComponent, RouterLink, MdbModalModule,],
  templateUrl: './exerciselist.component.html',
  styleUrl: './exerciselist.component.scss',
})
export class ExerciselistComponent {
  @Input('exercises') exercises: Exercise[] = [];
  @Output('edit') editEvent = new EventEmitter<Exercise>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Output('new') newEvent = new EventEmitter<any>();
  
    edit(exercise: Exercise){
      this.editEvent.emit(exercise);
    }

    new(){
      this.newEvent.emit();
    }

    delete(id: number){
      let index = this.exercises.findIndex(x =>{ return x.id == id} );
      this.exercises.splice(index, 1);
    
      this.deleteEvent.emit(id);
    }

    getJointPTBR(joint: Joint | null): string {
      return JointPTBR[joint as keyof typeof JointPTBR];
    }
    getIntensityPTBR(intensity: Intensity | null): string {
      return IntensityPTBR[intensity as keyof typeof IntensityPTBR];
    }

}
