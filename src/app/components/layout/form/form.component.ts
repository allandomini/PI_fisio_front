import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SelectionService } from '../../../services/selection.service';
import { FlowersComponent } from "../../flowers/flowers.component";
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FlowersComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  buttonStates: { [key: string]: boolean } = {
    Cervical: false,
    Ombro: false,
    Lombar: false,
    Joelho: false,
    Tornozelo: false,
    Quadril: false,
  };

  constructor(
    private router: Router,
    private selectionService: SelectionService,
    private snackBar: MatSnackBar 
  ) {}

  exercicio1(buttonId: string) {
    this.buttonStates[buttonId] = !this.buttonStates[buttonId];
  }

  enviar() {
    const selectedRegions = Object.keys(this.buttonStates).filter(
      (key) => this.buttonStates[key]
    );
    
    if (selectedRegions.length === 0) {
      this.openSnackBar('Você ainda não selecionou nenhuma opção!', 'Fechar');
    } else {
      console.log('Selected Regions:', selectedRegions); // Debug
      this.selectionService.setSelectedRegions(selectedRegions);
      this.router.navigate(['/form-intensidade']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 600},);
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
