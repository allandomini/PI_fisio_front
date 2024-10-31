import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { User } from '../../../models/user';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgClass } from '@angular/common';

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
    NgClass
  ],
  templateUrl: './user-info-login.component.html',
  styleUrl: './user-info-login.component.scss'
})
export class UserInfoLoginComponent {
  formGroup: FormGroup; 

  dateInput = '' 
  route = inject(Router)
  user: User = new User(0,'','','','',[],[]);

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
      course: new FormControl('',  Validators.required),
      date: new FormControl('',  Validators.required),
      isTeacher: new FormControl(true,  Validators.required),
    })

  }

  onIsTeacherChange(){
    if(this.isTeacher?.value){
      this.classes?.enable();
      this.course?.enable();
    }
      else{ // Se o checkbox for false
        this.classes?.disable();
        this.course?.disable();
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

      if (value && this.user.courses.length <= 10) {
        this.user.courses.push(this.classes?.value); 
        this.chipClasses.update(keywords => [...keywords, value]);
      }

      this.classes.reset()
      console.log(this.user.courses)

    }
  }

  removeTemplateKeyword(keyword: string) {
    this.chipClasses.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }
      this.user.courses.splice(index,1)
      keywords.splice(index, 1);
      return [...keywords];
    });
  }

  onSend(){
    this.route.navigate(['/form']);
  }
  
  get name() {
    return this.formGroup.get('name');
  }

  get course() {
    return this.formGroup.get('course');
  }

  get classes() {
    return this.formGroup.get('classes');
  }

  get isTeacher() {
    return this.formGroup.get('isTeacher');
  }
  get isTeacherValue(): boolean {
    return this.formGroup.get('isTeacher')?.value;
  }

}
