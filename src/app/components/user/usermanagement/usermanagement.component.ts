import { Component, inject, ViewChild } from '@angular/core';
import { UserlistComponent } from "../userlist/userlist.component";
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserPage } from '../../../models/user-page';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [UserlistComponent, MatPaginator],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.scss'
})
export class UserManagementComponent {
  userPage: UserPage | null = null;
  users: User[] = [];
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  // Objetos do paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex = 0;
  pageSize = 5;
  //--

  constructor(){
    this.listAll();
   }

  listAll(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }){
    this.userService.findAll(pageEvent.pageIndex, pageEvent.pageSize)
    .subscribe({
      next: userPage =>{
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;

        this.userPage = userPage
      },
      error: error =>{
        this.openSnackBar(error.error,'Close')
      }
    })
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {});
  }
}
