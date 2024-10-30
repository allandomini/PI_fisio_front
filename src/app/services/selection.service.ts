import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedRegions: string[] = [];
  private regiaoIntensidade: {[regiao: string]: string} = {};

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
}
