import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ExercisedetailsComponent } from '../../exercise/exercisedetails/exercisedetails.component';
import { JointIntensity, User } from '../../../models/user';
import { Intensity, Joint } from '../../../models/exercise';
import { NgClass } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [ExercisedetailsComponent, RouterLink, MdbModalModule, NgClass],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  users: User[] = [];
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  constructor(){
    this.listAll();
  }

  listAll(){
    this.userService.findAll().subscribe({
      next: users =>{
        this.users = users;
      },
      error: error =>{
        this.openSnackBar(error.error,'Close')
      }
    })
  }
  getBadgeClass(jointIntensity: JointIntensity): string {
    switch (jointIntensity.intensity) {
      case Intensity.High:
        return 'badge-danger';
      case Intensity.Medium:
        return 'badge-warning';
      case Intensity.Low:
        return 'badge-primary';
      default:
        return '';
    }
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {});
}
}
