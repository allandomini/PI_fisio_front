import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from "./components/layout/admin/admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PI_fisio_front';
}
