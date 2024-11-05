import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionService } from '../../../services/selection.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { HeaderComponent } from '../../header/header.component'; // Import SafeUrlPipe
import { TmplAstSwitchBlockCase } from '@angular/compiler';
import { JointIntensity } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ExerciseService } from '../../../services/exercise.service';
import { forkJoin, Observable, throwError } from 'rxjs';

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
  jointIntensities: JointIntensity[] = [];
  isDataLoaded: boolean = false;
  // Mapeamento de nomes para português
  private regionMap: { [key: string]: string } = {
    CERVICAL: 'Cervical',
    SHOULDER: 'Ombro',
    LOWERBACK: 'Lombar',
    KNEE: 'Joelho',
    ANKLE: 'Tornozelo',
    HIP: 'Quadril',
  };

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private authService: AuthService,
    private selectionService: SelectionService,
    private router: Router,
    private sanitizer: DomSanitizer // Add DomSanitizer for safe embedding
  ) {}

  ngOnInit() {
    // se for redirecionado (login ou form)
    if (this.selectionService.getJointIntensities().length > 0) {
      this.jointIntensities = this.selectionService.getJointIntensities();
      this.selectedRegions = this.selectionService
        .getJointIntensities()
        .map((jointIntensity) => this.regionMap[jointIntensity.joint] || jointIntensity.joint);
      this.fetchExercises();
    } // Se tiver logado mas nao foi redirecionado
    else if (this.authService.getAccessToken()) {
      this.userService.getInfo().subscribe({
        next: (user) => {
          if (user.jointIntensities && user.jointIntensities?.length > 0) {
            this.jointIntensities = user.jointIntensities;
            this.jointIntensities.map((jointIntensity) =>{
              this.selectedRegions.push(this.regionMap[jointIntensity.joint] || jointIntensity.joint)
            });

            this.fetchExercises();
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private transformToEmbedUrl(url: string): SafeResourceUrl {
    let videoId: string | undefined;
    if (url.includes('youtube.com')) {
      //verifica se ta no dominio do you
      videoId = url.split('v=')[1]?.split('&')[0]; //se a url tiver certa ela vai extrair a partir vo v ali
      //o split vai divir em duas partes, o 1 seleciona a parte após o v= onde o ID do video inicia
      // o split('&')[0] serve para separar qlqr outro parametro q venha apos o ID
    } else if (url.includes('youtu.be')) {
      //ve o dominio
      videoId = url.split('/').pop(); // divide a URL em segmentos usando a barra como delimitador e retorna o último segmento, que é o ID do vídeo.
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

  fetchExercises() {
    const requests: Observable<any>[] = [];
     // stackando os requests
    this.jointIntensities.map((jointIntensity) => {
      const exerciseRequest =
        this.exerciseService.getExercisesByJointAndIntensity(
          jointIntensity.joint,
          jointIntensity.intensity
        );
      requests.push(exerciseRequest);
    });

    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        this.selectedExercises = responses.flat().map((exercise: any) => ({
          ...exercise,
          joint: this.regionMap[exercise.joint] || exercise.joint, // Traduza a região aqui
          embedUrl: this.transformToEmbedUrl(exercise.videoUrl),
        }));
        console.log('Exercise responses:', responses);
        this.isDataLoaded = true; // Define que os dados foram carregados
      },
      error: (err) => {
        console.error('Error fetching exercises:', err);
      },
    });

    console.log('regioess ', this.selectedRegions);

    // this.selectedRegions = this.selectionService.getSelectedRegions();

    // this.selectedRegions = this.selectionService
    //   .getSelectedRegions()
    //   .map((region) => this.regionMap[region] || region);
  }
}
