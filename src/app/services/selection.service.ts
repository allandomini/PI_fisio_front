import { Injectable } from '@angular/core';
import { JointIntensity } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedRegions: string[] = [];
  private regiaoIntensidade: { [regiao: string]: string } = {};
  private selectedExercises: any[] = [];
  private jointIntensities: JointIntensity[] = [];
  setSelectedRegions(regions: string[]) {
    this.selectedRegions = regions;
  }

  getSelectedRegions(): string[] {
    return this.selectedRegions;
  }

  setRegionIntensity(region: string, intensity: string) {
    this.regiaoIntensidade[region] = intensity;
  }

  getRegionIntensities(): { [region: string]: string } {
    return this.regiaoIntensidade;
  }
  setSelectedExercises(exercises: any[]): void {
    this.selectedExercises = exercises;
  }

  getSelectedExercises(): any[] {
    return this.selectedExercises;
  }
  setJointIntensities(jointIntensities: JointIntensity[]): void {
    this.jointIntensities = jointIntensities;
  }

  getJointIntensities(): JointIntensity[]{
    return this.jointIntensities;
  }
}
