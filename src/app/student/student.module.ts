import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { ScoreComponent } from './score/score.component';
import { ClassmateComponent } from './classmate/classmate.component';
import { AverageComponent } from './average/average.component';

@NgModule({
  declarations: [
    ScoreComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ScoreComponent,
    ClassmateComponent,
    AverageComponent
  ]
})
export class StudentModule { }