import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [RouterModule], // Añadir RouterModule aquí para permitir el uso de `routerLink` y `router-outlet`
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'] // Corrige `styleUrl` a `styleUrls`
})
export class ScoreComponent {
  // Tu lógica aquí
}
