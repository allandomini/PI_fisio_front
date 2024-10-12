import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AppComponent } from "../../../app.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MdbCollapseModule, AppComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
