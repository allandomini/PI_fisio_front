import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { User } from '../../../models/user';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { formatDate, NgClass } from '@angular/common';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-info-login',
  standalone: true,
  imports: [    
    FormsModule,
    MdbFormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MdbCheckboxModule,
    MdbValidationModule,
    NgClass
  ],
  templateUrl: './user-info-login.component.html',
  styleUrl: './user-info-login.component.scss'
})
export class UserInfoLoginComponent {
  formGroup: FormGroup; 

  dateInput = '' 
  route = inject(Router)
  userService = inject(UserService);
  user: User = new User(null,'', '', null, null, null, '', [], null);

  readonly chipClasses = signal<string[]>([]);

  ngOnInit() {
    const userName = localStorage.getItem('userName');
    if(userName){
      this.formGroup.patchValue({
        name: userName,
      })
    }

    this.isTeacher?.valueChanges.subscribe((value) =>{
      this.onIsTeacherChange()
    })
  }
  constructor(){
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      classes: new FormControl('',  Validators.required),
      subject: new FormControl('',  Validators.required),
      date: new FormControl('',  Validators.required),
      isTeacher: new FormControl(true,  Validators.required),
    })
  }

  onIsTeacherChange(){
    if(this.isTeacher?.value){
      this.classes?.enable();
      this.subject?.enable();
    }
      else{ // Se o checkbox for false
        this.classes?.disable();
        this.subject?.disable();
    }
  }

  onBlurClasses(){ // Quando o input de classes perder o foco!
    this.onSendCourse();

    console.log(this.chipClasses().length)
    if(this.chipClasses().length > 0 ){// Deixando o valor de classes como ' ' para label ir para cima e nao sobrepor os chips.
      this.formGroup.patchValue({ 
        classes: ' '
      })
    }
  }

  onSendCourse(){
    if (this.classes && this.classes.value) {
      const value = (this.classes.value || '').trim();

      if (value && this.user.classes && this.user.classes.length < 10) {
        this.user.classes.push(this.classes?.value); 
        this.chipClasses.update(keywords => [...keywords, value]);
      }

      this.classes.reset()
      console.log(this.user.classes)

    }
  }

  removeTemplateKeyword(keyword: string) {
    this.chipClasses.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }
      this.user.classes?.splice(index,1)
      keywords.splice(index, 1);
      return [...keywords];
    });
  }

  onSend(){
    this.formGroup.markAllAsTouched();

    this.user.name = this.name?.value
    this.user.subject = this.subject?.value
    this.user.dateOfBirth =  this.date?.value
    if(this.formGroup.valid){
      this.userService.patchUpdate(this.user).subscribe({
        next: response => {
            this.route.navigate(['/form']);
        },
        error: err => {
            console.error("Update failed:", err);
        }
    });

    }    
  }

  
  get name() {
    return this.formGroup.get('name');
  }

  get subject() {
    return this.formGroup.get('subject');
  }

  get classes() {
    return this.formGroup.get('classes');
  }

  get isTeacher() {
    return this.formGroup.get('isTeacher');
  }
  get date() {
    return this.formGroup.get('date');
  }
  get isTeacherValue(): boolean {
    return this.formGroup.get('isTeacher')?.value;
  }

}
