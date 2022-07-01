import { Component, OnInit } from '@angular/core';
import { QuizDataService } from 'src/services/quizData.service';
import { LoadDataQuizService } from 'src/services/loadDataQuiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quizDataState = this.quizDataService.state;

  loadDataQuizState = this.loadDataQuiz.state;

  constructor(private quizDataService : QuizDataService, private loadDataQuiz : LoadDataQuizService) { }

  ngOnInit(): void {
    this.quizDataService.loadDataQuiz();
  }

}
