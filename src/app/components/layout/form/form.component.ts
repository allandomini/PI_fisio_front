import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SelectionService } from '../../../services/selection.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  buttonStates: { [key: string]: boolean } = {
    cevical: false,
    ombro: false,
    lombar: false,
    Joelho: false,
    Tornozelo: false,
    Quadril: false,
  };

  constructor(
    private router: Router,
    private selectionService: SelectionService
  ) {}

  exercicio1(buttonId: string) {
    this.buttonStates[buttonId] = !this.buttonStates[buttonId];
  }

  enviar() {
    const selectedRegions = Object.keys(this.buttonStates).filter(
      (key) => this.buttonStates[key]
    );
    console.log('Selected Regions:', selectedRegions); // Debug
    this.selectionService.setSelectedRegions(selectedRegions);
    this.router.navigate(['/form-intensidade']);
  }
}
