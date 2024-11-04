import { Component, inject, OnInit } from '@angular/core';
import { SelectionService } from '../../../services/selection.service';
import { ExerciseService } from '../../../services/exercise.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { JointIntensity, User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Intensity, Joint } from '../../../models/exercise';
import { FlowersComponent } from "../../flowers/flowers.component";

@Component({
  selector: 'app-form-intensidade',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FlowersComponent],
  templateUrl: './form-intensidade.component.html',
  styleUrls: ['./form-intensidade.component.scss'],
})
export class FormIntensidadeComponent implements OnInit {
  selectedRegions: string[] = [];
  selectedCheckbox: { [key: string]: string } = {};
  userService = inject(UserService);
  user: User = new User(null, null, null, null, null, null, null, [], []);

  private intensityMap: { [key: string]: string } = {
    leve: 'LOW',
    moderada: 'MEDIUM',
    intensa: 'HIGH',
  };

  private regionMap: { [key: string]: string } = {
    Cervical: 'CERVICAL',
    Ombro: 'SHOULDER',
    Lombar: 'LOWERBACK',
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
      const formattedRegion = translatedRegion.charAt(0) + translatedRegion.slice(1).toLowerCase();
      const formattedIntensity = translatedIntensity.charAt(0) + translatedIntensity.slice(1).toLowerCase();

      const jointIntensity = new JointIntensity(
        Joint[formattedRegion as keyof typeof Joint],
        Intensity[formattedIntensity as keyof typeof Intensity]
      );

      this.user.jointIntensities?.push(jointIntensity);
      const exerciseRequest =
        this.exerciseService.getExercisesByJointAndIntensity(
          jointIntensity.joint,
          jointIntensity.intensity
        );
      requests.push(exerciseRequest);
    });

    this.userService.patchUpdate(this.user).subscribe({
      next: (response) => {
        if (requests.length > 0) {
          forkJoin(requests).subscribe({
            next: (responses: any[]) => {
              const allExercises = responses.flat();
              this.selectionService.setSelectedExercises(allExercises);
              this.router.navigate(['/result']);
              console.log('Exercise responses:', responses);
            },
            error: (err) => {
              console.error('Error fetching exercises:', err);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
      },
    });
  }
}
