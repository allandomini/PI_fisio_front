import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Intensity, Joint } from '../../../models/exercise';
@Component({
  selector: 'app-exercisedetails',
  standalone: true,
  imports: [MdbFormsModule,MdbDropdownModule, MdbRippleModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exercisedetails.component.html',
  styleUrl: './exercisedetails.component.scss'
})
export class ExercisedetailsComponent {
  intensityOptions  = Object.keys(Intensity).map(key => ({
    value: Intensity[key as keyof typeof Intensity],
    viewValue: Intensity[key as keyof typeof Intensity]
  }));

  intensityControl = new FormControl<Intensity | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  jointOptions  = Object.keys(Joint).map(key => ({
    value: Joint[key as keyof typeof Joint],
    viewValue: Joint[key as keyof typeof Joint]
  }));

  jointControl = new FormControl<Intensity | null>(null, Validators.required);

}
