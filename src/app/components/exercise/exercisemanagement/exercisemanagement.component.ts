import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ExerciselistComponent } from '../exerciselist/exerciselist.component';
import { Exercise, Intensity, Joint } from '../../../models/exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ExercisedetailsComponent } from '../exercisedetails/exercisedetails.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ExercisePage } from '../../../models/exercise-page';
import { PageEvent } from '@angular/material/paginator/index';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ExerciseFilterDTO } from '../../../models/exercise-filter-dto';
@Component({
  selector: 'app-exercisemanagement',
  standalone: true,
  imports: [
    ExerciselistComponent,
    ExercisedetailsComponent,
    MatPaginatorModule,
    MdbCollapseModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
  ],
  templateUrl: './exercisemanagement.component.html',
  styleUrl: './exercisemanagement.component.scss',
})
export class ExerciseManagementComponent {
  exercises: Exercise[] = [];
  exerciseEdit: Exercise = new Exercise(0, '', '', '', '', null, null);
  exercisePage: ExercisePage | null = null;

  exerciseService = inject(ExerciseService);
  snackBar = inject(MatSnackBar);

  // Objetos da modal
  modalService = inject(MdbModalService); // Para abrir a modal
  @ViewChild('modalExerciseDetails') modalExerciseDetail!: TemplateRef<any>; // referencia do template da modal do html (O ng-template que foi criado que é a modal)
  modalRef!: MdbModalRef<any>; //  referencia da modal para conseguir fechar dps.
  // --

  // Objetos do paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 5;
  //--

  // Objetos do filter
  exerciseFilter = new ExerciseFilterDTO([], [], '');
  filterForm: FormGroup;
  debounceTimeout: any;
  //--

  // Objetos utilizados nos selects.
  intensityOptions = Object.keys(Intensity).map((key) => ({
    value: Intensity[key as keyof typeof Intensity],
    viewValue: Intensity[key as keyof typeof Intensity],
  }));

  jointOptions = Object.keys(Joint).map((key) => ({
    value: Joint[key as keyof typeof Joint],
    viewValue: Joint[key as keyof typeof Joint],
  }));
  //--

  constructor() {
    this.refresh();

    this.filterForm = new FormGroup({
      name: new FormControl(this.exerciseFilter.name, Validators.required),
      intensities: new FormControl(
        this.exerciseFilter.intensities,
        Validators.required
      ),
      joints: new FormControl(this.exerciseFilter.joints, Validators.required),
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((value) => {
      this.onFilterChange(value);
    });
  }

  onFilterChange(value: any) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.exerciseFilter = {
      name: value.name,
      joints: value.joints,
      intensities: value.intensities,
    };
    // debounce para nao fazer uma requisiçao a cada letra digitada / opçao selecionada
    this.debounceTimeout = setTimeout(() => {
      this.refresh(); //
    }, 500);
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }) {
    this.exerciseService
      .findAll(pageEvent.pageIndex, pageEvent.pageSize, this.exerciseFilter)
      .subscribe({
        next: (exercisePage) => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;

          this.exercisePage = exercisePage;
          this.exercises = exercisePage.exercises;
        },
        error: (error) => {
          this.openSnackBar(error.error, 'Close');
        },
      });
  }

  onDelete(id: number) {
    this.exerciseService.delete(id).subscribe({
      next: (value) => {
        this.openSnackBar('Exercise has been deleted successfully!', 'Close');
      },
      error: (error) => {
        this.openSnackBar(error.error, 'Close');
      },
    });
  }

  onEdit(exercise: Exercise) {
    this.exerciseEdit = Object.assign({}, exercise); // Clonando para evitar refernecia de objeto
    this.modalRef = this.modalService.open(this.modalExerciseDetail);
  }

  onNew() {
    this.newModal();
  }

  onReturnDetail(exercise: Exercise) {
    if (exercise.id > 0) {
      // Em caso de edição.
      this.exerciseService.update(exercise, exercise.id).subscribe({
        next: (value) => {
          let index = this.exercises.findIndex((x) => {
            return x.id == exercise.id;
          });
          this.exercises[index] = exercise;

          this.openSnackBar('Exercise has been updated successfully!', 'Close');
          this.modalRef.close();
        },
        error: (error) => {
          this.openSnackBar(error.error, 'Close');
        },
      });
    } else {
      // Em caso de criação.
      this.exerciseService.save(exercise).subscribe({
        next: (value) => {
          this.exercises.pop();
          exercise.id = value.id;
          this.exercises.push(exercise);

          this.openSnackBar('Exercise has been saved successfully!', 'Close');
          this.modalRef.close();
        },
        error: (error) => {
          this.openSnackBar(error.error, 'Close');
        },
      });
    }
  }
  newModal() {
    this.exerciseEdit = new Exercise(0, '', '', '', '', null, null);
    this.modalRef = this.modalService.open(this.modalExerciseDetail);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {});
  }
}
