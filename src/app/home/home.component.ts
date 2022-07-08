import { Component, OnInit } from '@angular/core';
import { QuizDataService } from 'src/services/quiz-data.service';
import { combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vm$ = combineLatest([this.quizDataService.isLoaded$, this.quizDataService.quizDataLength$, this.quizDataService.bestScore$ ]).pipe(
    map(([isLoaded, quizDataLength, bestScore]) => {
      return { isLoaded, quizDataLength, bestScore };
    })
  )

  constructor(private quizDataService : QuizDataService) { }

  ngOnInit(): void {
    this.quizDataService.loadDataQuiz();
  }

}
