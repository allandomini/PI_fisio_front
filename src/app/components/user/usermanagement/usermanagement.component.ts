import { Component } from '@angular/core';
import { UserlistComponent } from "../userlist/userlist.component";

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [UserlistComponent],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.scss'
})
export class UserManagementComponent {

}
