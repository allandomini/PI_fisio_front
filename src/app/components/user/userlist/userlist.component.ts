import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { ExercisedetailsComponent } from '../../exercise/exercisedetails/exercisedetails.component';
import { JointIntensity, User } from '../../../models/user';
import { Intensity, Joint } from '../../../models/exercise';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [ExercisedetailsComponent, RouterLink, MdbModalModule, NgClass],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  users: User[] = [];
  user1: User = new User(
    1,
    'Pedro Henrique',
    'email@email.com',
    'ADMIN',
    'https://mdbootstrap.com/img/new/avatars/8.jpg',
    ['6ºB', '8ºC', '7ºA'],
    [
      new JointIntensity(Joint.Shoulder, Intensity.High),
      new JointIntensity(Joint.Knee, Intensity.Low),
      new JointIntensity(Joint.Cervical, Intensity.Medium),
    ]
  );
  constructor(){
    this.users.push(this.user1);
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
}
