import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlowersComponent } from "../../flowers/flowers.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlowersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  description = "Métodos fisioterapêuticos para alívio e prevenção de dores em professores do Ensino Fundamental"
  onStart() {
    this.router.navigate(['/google']);
  }
}
