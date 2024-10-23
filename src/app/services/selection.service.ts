import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedRegions: string[] = [];

  setSelectedRegions(regions: string[]) {
    this.selectedRegions = regions;
  }

  getSelectedRegions(): string[] {
    return this.selectedRegions;
  }
}
