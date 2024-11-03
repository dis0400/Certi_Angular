import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from './exam.service';

@Component({
  selector: 'app-classmate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classmate.component.html',
  styleUrls: ['./classmate.component.scss']
})
export class ClassmateComponent {
  newScores: number[] = [];
  
  constructor(private _examService: ExamService) { 
    this._examService.getScoresAsObservable().subscribe(scores => {
      console.log('SCORES: ', scores);
      this.newScores = scores;
    });
  }
}
