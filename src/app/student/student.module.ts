import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Añadir RouterModule aquí
import { StudentRoutingModule } from './student-routing.module';
import { ScoreComponent } from './score/score.component';
import { ClassmateComponent } from './classmate/classmate.component';
import { AverageComponent } from './average/average.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, // Asegúrate de importar RouterModule aquí
    StudentRoutingModule,
    ScoreComponent,
    ClassmateComponent,
    AverageComponent
  ]
})
export class StudentModule { }
