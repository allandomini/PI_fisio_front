import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../services/selection.service';
import { CommonModule } from '@angular/common';
import { Intensity } from '../../../models/exercise';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-intensidade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-intensidade.component.html',
  styleUrls: ['./form-intensidade.component.scss'],
})
export class FormIntensidadeComponent implements OnInit {
  selectedRegions: string[] = [];
  
  constructor(
    private router: Router,
    private selectionService: SelectionService
  ) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService.getSelectedRegions();
    console.log('Regions loaded:', this.selectedRegions); 
  }

  setIntensity (regiao: string, intensity: string){
    this.selectionService.setRegionIntensity(regiao, intensity);
  }
  
  result(){
    this.router.navigate(['/result']);
  }
}
