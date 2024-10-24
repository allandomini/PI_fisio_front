import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../services/selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-intensidade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-intensidade.component.html',
  styleUrls: ['./form-intensidade.component.scss'],
})
export class FormIntensidadeComponent implements OnInit {
  selectedRegions: string[] = [];

  constructor(private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService.getSelectedRegions();
    console.log('Regions loaded:', this.selectedRegions); // Debug
  }
}
