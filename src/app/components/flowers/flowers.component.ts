import { Component, Input, input } from '@angular/core';
@Component({
  selector: 'app-flowers',
  standalone: true,
  imports: [],
  templateUrl: './flowers.component.html',
  styleUrl: '../layout/home/home.component.scss'
  // styleUrl: './flowers.component.scss'
})
export class FlowersComponent {
@Input("customClass") class: string = "";
}
