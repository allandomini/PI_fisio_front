import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Exercise, Intensity, Joint } from '../../../models/exercise';
import { ExercisedetailsComponent } from '../exercisedetails/exercisedetails.component';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ExerciseService } from '../../../services/exercise.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  exerciseService = inject(ExerciseService)
  snackBar = inject(MatSnackBar);
  // Objetos da modal
  modalService = inject(MdbModalService); // Para abrir a modal
  @ViewChild("modalExerciseDetails") modalExerciseDetail!: TemplateRef<any>;  // referencia do template da modal do html (O ng-template que foi criado que é a modal)
  modalRef!: MdbModalRef<any>; //  referencia da modal para conseguir fechar dps.
   
  constructor(){
    this.listAll()
  }

    newModal(){  
      this.exerciseEdit = new Exercise(0, '','','','',null,null);
      this.modalRef = this.modalService.open(this.modalExerciseDetail);
    }

    listAll(){
      this.exerciseService.findAll().subscribe({
        next: exercises =>{
          this.exercises = exercises;
        },
        error: error =>{
          this.openSnackBar(error.error,'Close')
        }
      })
    }

    edit(exercise: Exercise){
      this.exerciseEdit = Object.assign({}, exercise); // Clonando para evitar refernecia de objeto
      this.modalRef = this.modalService.open(this.modalExerciseDetail);
    }

    deleteById(id: number){
      let index = this.exercises.findIndex(x =>{ return x.id == id} );
      this.exercises.splice(index, 1);
    
      this.exerciseService.delete(id).subscribe({
        next: value =>{
          this.openSnackBar("Exercise has been deleted successfully!",'Close')
        },
        error: error =>{
          this.openSnackBar(error.error,'Close')
        }
      })
    }

    returnDetail(exercise:Exercise){
      if(exercise.id > 0 ){ // Em caso de edição.
        this.exerciseService.update(exercise,exercise.id).subscribe({
          next: value =>{
            let index = this.exercises.findIndex(x =>{ return x.id == exercise.id} );
            this.exercises[index] = exercise

            this.openSnackBar("Exercise has been updated successfully!",'Close')
            this.modalRef.close();
          },
          error: error =>{
            this.openSnackBar(error.error,'Close')
          }
        })
      }
      else{ // Em caso de criação.
          this.exerciseService.save(exercise).subscribe({
            next: value =>{
              this.exercises.push(exercise);
             
              this.openSnackBar("Exercise has been saved successfully!",'Close')
              this.modalRef.close();
            },
            error: error =>{
              this.openSnackBar(error.error,'Close')
            }
          })
      }
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {});
  }
}
