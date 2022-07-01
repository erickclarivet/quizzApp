import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GameInfoService } from 'src/services/game-info.service';
import { QuizDataService, QuizDataState } from 'src/services/quizData.service';

@Component({
  selector: 'app-game-quiz',
  templateUrl: './game-quiz.component.html',
  styleUrls: ['./game-quiz.component.scss']
})
export class GameQuizComponent implements OnInit {

  quizState : BehaviorSubject<QuizDataState>;
  gameInfoState = this.gameInfoService.gameState;
  choice : any;
  isQuizEnded = false;

  constructor(private quizDataService : QuizDataService, private gameInfoService : GameInfoService) {
    this.quizState = this.quizDataService.state;
  }

  ngOnInit(): void {
  }

  splitDescription(choices: string[]) : string[] {
    console.log(choices);
    return choices;
}

  selectedChoice(choice:any) {
    console.log('user choice : ' + choice);
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

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex :currentQuestionIndex + 1), correctAnswer);
  }
}
