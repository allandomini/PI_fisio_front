import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../../../services/selection.service';
import { ExerciseService } from '../../../services/exercise.service'; // Import ExerciseService
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private exerciseService: ExerciseService // Inject ExerciseService
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
    Object.entries(this.selectedCheckbox).forEach(([region, intensity]) => {
      const translatedRegion = this.regionMap[region];
      const translatedIntensity = this.intensityMap[intensity];
      this.fetchExercises(translatedRegion, translatedIntensity);
    });
  }

  // Use ExerciseService to fetch exercises
  fetchExercises(joint: string, intensity: string) {
    this.exerciseService.findByJointAndIntensity(joint, intensity).subscribe(
      (response: any) => {
        console.log(`Exercises for ${joint} (${intensity}):`, response);
      },
      (error: any) => {
        console.error(
          `Error fetching exercises for ${joint} (${intensity}):`,
          error
        );
      }
    );
  }
}
