import { Component } from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public modalRef: MdbModalRef<ModalComponent>, private router: Router) {}

  navigateToStart(): void {
    this.modalRef.close();
    this.router.navigate(['/login/userinfo']); 
  }

  navigateToResult(): void {
    this.modalRef.close();
    this.router.navigate(['/result']); 
  }
}
