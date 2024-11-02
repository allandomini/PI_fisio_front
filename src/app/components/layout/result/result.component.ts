import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionService } from '../../../services/selection.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { HeaderComponent } from "../../header/header.component"; // Import SafeUrlPipe

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatTabsModule, SafeUrlPipe, HeaderComponent],
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
    this.selectedRegions = this.selectionService.getSelectedRegions();

    this.selectedRegions = this.selectionService
      .getSelectedRegions()
      .map((region) => this.regionMap[region] || region);
  
    this.selectedExercises = this.selectionService
      .getSelectedExercises()
      .map((exercise: any) => ({
        ...exercise,  
        joint: this.regionMap[exercise.joint] || exercise.joint, // Traduza a região aqui
        embedUrl: this.transformToEmbedUrl(exercise.videoUrl),
      }));
      console.log(this.selectedExercises)
  }
  
  private transformToEmbedUrl(url: string): SafeResourceUrl {
    let videoId: string | undefined;
    if (url.includes('youtube.com')) { //verifica se ta no dominio do you
      videoId = url.split('v=')[1]?.split('&')[0]; //se a url tiver certa ela vai extrair a partir vo v ali
      //o split vai divir em duas partes, o 1 seleciona a parte após o v= onde o ID do video inicia
      // o split('&')[0] serve para separar qlqr outro parametro q venha apos o ID
    } else if (url.includes('youtu.be')) { //ve o dominio
      videoId = url.split('/').pop();// divide a URL em segmentos usando a barra como delimitador e retorna o último segmento, que é o ID do vídeo.
    }
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`; //se extrair com sucesso ai vai pegar o ID do video  e após retorna para o angular uma URL segura
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(''); // se o video n ser encontrado vai retornar a URL vazia ^^
  }
  

  message() {
    const back = confirm('Tem certeza que deseja voltar ao início?');
    if (back) {
      this.router.navigate(['/home']);
    }
  }
}
