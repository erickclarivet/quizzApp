import { Component, OnInit } from '@angular/core';
import { QuizDataService } from 'src/services/quizData.service';
import { LoadDataQuizService } from 'src/services/loadDataQuiz.service';
import { GameInfoService } from 'src/services/game-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quizDataState = this.quizDataService.state;
  gameInfoState = this.gameInfoService.gameState;
  loadDataQuizState = this.loadDataQuiz.state;

  constructor(private quizDataService : QuizDataService, private loadDataQuiz : LoadDataQuizService, private gameInfoService : GameInfoService) { }

  ngOnInit(): void {
    this.quizDataService.loadDataQuiz();
    this.gameInfoService.restart();
  }

}
