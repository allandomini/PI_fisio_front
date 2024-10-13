import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Exercise, Intensity, Joint } from '../../../models/exercise';
import { ExercisedetailsComponent } from '../exercisedetails/exercisedetails.component';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-exerciselist',
  standalone: true,
  imports: [ExercisedetailsComponent, RouterLink, MdbModalModule],
  templateUrl: './exerciselist.component.html',
  styleUrl: './exerciselist.component.scss',
})
export class ExerciselistComponent {
  exercises: Exercise[] = [];
  exerciseEdit: Exercise = new Exercise(0, '','','','',null,null);
  exercise1: Exercise = new Exercise(
    1,
    'Abdição e Adução Ombro',
    'Para realizarmos a adução e abdução de de ombro vamos posicionar os braços na linha do ombro sobrepostos um ao outro, com os cotovelos flexionados vamos realizar o movimento como se fosse um abraço.Para realizarmos a adução e abdução de de ombro vamos posicionar os braços na linha do ombro sobrepostos um ao outro, com os cotovelos flexionados vamos realizar o movimento como se fosse um abraço.',
    'Durante 3 a 5 minutos',
    'https://www.youtube.com/watch?v=-TwoOtU-bqc',
    Intensity.Low,
    Joint.Shoulder
  );

    // Objetos da modal
    modalService = inject(MdbModalService); // Para abrir a modal
    @ViewChild("modalExerciseDetails") modalExerciseDetail!: TemplateRef<any>;  // referencia do template da modal do html (O ng-template que foi criado que é a modal)
    modalRef!: MdbModalRef<any>; //  referencia da modal para conseguir fechar dps.

    newModal(){  
      this.exerciseEdit = new Exercise(0, '','','','',null,null);
      this.modalRef = this.modalService.open(this.modalExerciseDetail);
    }

    edit(exercise: Exercise){
      // console.log(exercise)
      this.exerciseEdit = Object.assign({}, exercise); // Clonando para evitar refernecia de objeto
      this.modalRef = this.modalService.open(this.modalExerciseDetail);
    }

    deleteById(id: number){
      let index = this.exercises.findIndex(x =>{ return x.id == id} );
      this.exercises.splice(index, 1);
    }

    returnDetail(exercise:Exercise){
      this.modalRef.close();

      if(exercise.id > 0 ){ // Em caso de edição.
        let index = this.exercises.findIndex(x =>{ return x.id == exercise.id} );
        this.exercises[index] = exercise
      }else{ // Em caso de criação.
          exercise.id = 1001;
          this.exercises.push(exercise);
      }
    }
  constructor(){
    this.exercises.push(this.exercise1,this.exercise1); 
  }
}
