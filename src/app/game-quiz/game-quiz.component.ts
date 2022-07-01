import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, map, min } from 'rxjs';
import { GameInfoService } from 'src/services/game-info.service';
import { QuizDataService, QuizDataState } from 'src/services/quizData.service';
import { TimerService } from 'src/services/timer-service';

@Component({
  selector: 'app-game-quiz',
  templateUrl: './game-quiz.component.html',
  styleUrls: ['./game-quiz.component.scss']
})
export class GameQuizComponent implements OnInit {

  quizState : BehaviorSubject<QuizDataState>;
  gameInfoState = this.gameInfoService.gameState;
  timerState = this.timerService.timerState;

  choice : any;
  isQuizEnded = false;

  constructor(private quizDataService : QuizDataService, private gameInfoService : GameInfoService,
    private timerService : TimerService) {
    this.quizState = this.quizDataService.state;
  }

  ngOnInit(): void {
    this.timerService.startCountdown();
  }

  selectedChoice(choice:any) {
    this.choice = choice;
  }

  validate(currentQuestionIndex : number, answer: string) {
    var correctAnswer = 0;

    if (this.choice == answer) {
      correctAnswer++;
    }

    // put it in the game service
    this.quizDataService.state.pipe(map(state => {
      return (state.quizData.length == (currentQuestionIndex + 1)? true : false)})).subscribe(isFinished => this.isQuizEnded = isFinished);

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex : currentQuestionIndex + 1), correctAnswer);

    if (this.isQuizEnded)
    {
      this.timerService.stopCountdown();
      this.gameInfoService.registerBestScore();
    }
  }

  startCountdown() {
    this.timerService.startCountdown();
  }

  stopCountdown() {
    this.timerService.stopCountdown();
  }

  getTimer()
  {
    return this.timerService.convertCounterToStringTime();
  }
}
