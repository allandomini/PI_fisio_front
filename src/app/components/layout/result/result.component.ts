import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SelectionService } from '../../../services/selection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  selectedRegions: string[] = [];

  constructor(
    private selectionService: SelectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService.getSelectedRegions();
  }

  message() {
    let back = confirm('Tem certeza que deseja voltar ao início?');
    if (back == true) {
      this.router.navigate(['/home']);
    } else{
      return;
    }
  }
}
