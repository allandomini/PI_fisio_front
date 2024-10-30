import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../services/selection.service';
import { ExerciseService } from '../../../services/exercise.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-form-intensidade',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './form-intensidade.component.html',
  styleUrls: ['./form-intensidade.component.scss'],
})
export class FormIntensidadeComponent implements OnInit {
  selectedRegions: string[] = [];
  selectedCheckbox: { [key: string]: string } = {};

  private intensityMap: { [key: string]: string } = {
    leve: 'LOW',
    moderada: 'MEDIUM',
    intensa: 'HIGH',
  };

  private regionMap: { [key: string]: string } = {
    Cervical: 'CERVICAL',
    Ombro: 'SHOULDER',
    Lombar: 'LUMBAR',
    Joelho: 'KNEE',
    Tornozelo: 'ANKLE',
    Quadril: 'HIP',
  };

  constructor(
    private selectionService: SelectionService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService.getSelectedRegions();
    console.log('Regions loaded:', this.selectedRegions);
  }

  onCheckboxChange(event: any, region: string, level: string): void {
    if (event.target.checked) {
      this.selectedCheckbox[region] = level;
    } else if (this.selectedCheckbox[region] === level) {
      delete this.selectedCheckbox[region];
    }
  }

  submitSelection() {
    const requests: Observable<any>[] = [];

    Object.entries(this.selectedCheckbox).forEach(([region, intensity]) => {
      const translatedRegion = this.regionMap[region];
      const translatedIntensity = this.intensityMap[intensity];
      const request = this.exerciseService.findByJointAndIntensity(
        translatedRegion,
        translatedIntensity
      );
      requests.push(request);
    });

    forkJoin(requests).subscribe(
      (responses: any[]) => {
        const allExercises = responses.flat();
        this.selectionService.setSelectedExercises(allExercises);
        this.router.navigate(['/result']);
      },
      (error: any) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }
}
