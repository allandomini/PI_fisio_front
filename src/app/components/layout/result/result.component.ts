import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SelectionService } from '../../../services/selection.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  selectedRegions: string[] = [];

  constructor(private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService.getSelectedRegions();
  }
}
