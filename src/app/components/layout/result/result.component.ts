import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionService } from '../../../services/selection.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe'; // Import SafeUrlPipe

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTabsModule, SafeUrlPipe],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  selectedRegions: string[] = [];
  selectedExercises: any[] = [];

  // Mapeamento de nomes para português
  private regionMap: { [key: string]: string } = {
    CERVICAL: 'Cervical',
    SHOULDER: 'Ombro',
    LUMBAR: 'Lombar',
    KNEE: 'Joelho',
    ANKLE: 'Tornozelo',
    HIP: 'Quadril',
  };

  constructor(
    private selectionService: SelectionService,
    private router: Router,
    private sanitizer: DomSanitizer // Add DomSanitizer for safe embedding
  ) {}

  ngOnInit() {
    this.selectedRegions = this.selectionService
      .getSelectedRegions()
      .map((region) => this.regionMap[region] || region);

    this.selectedExercises = this.selectionService
      .getSelectedExercises()
      .map((exercise: any) => {
        return {
          exercise,
          joint: this.regionMap[exercise.joint] || exercise.joint, // Traduza a região aqui
          videoUrl: this.transformToEmbedUrl(exercise.videoUrl),
        };
      });
  }

  private transformToEmbedUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1]; // Extract video ID from URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`; // Convert to embed format
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl); // Sanitize URL
  }

  message() {
    const back = confirm('Tem certeza que deseja voltar ao início?');
    if (back) {
      this.router.navigate(['/home']);
    }
  }
}
