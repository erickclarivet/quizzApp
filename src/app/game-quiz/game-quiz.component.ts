import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { GameInfoService } from 'src/services/game-info.service';
import { QuizDataService } from 'src/services/quiz-data.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-game-quiz',
  templateUrl: './game-quiz.component.html',
  styleUrls: ['./game-quiz.component.scss'],
  providers: [GameInfoService]
})

export class GameQuizComponent implements OnInit {

  choiceSelected = "";
  vm$ = combineLatest([ this.quizDataService.quizData$, this.quizDataService.quizDataLength$,
    this.gameInfoService.currentQuestionIndex$, this.gameInfoService.countDownEnded$, this.gameInfoService.countDownValueFormated$,
    this.quizDataService.bestScore$, this.gameInfoService.playerScore$ ])
    .pipe(map(([ quizData, quizDataLength, currentQuestionIndex, countDownEnded, countDownValueFormated, bestScore, playerScore ]) => {
      return { quizData, quizDataLength, currentQuestionIndex, countDownEnded, countDownValueFormated, bestScore, playerScore }
    }));

  choice = '';
  isQuizEnded = false;

  myForm = this.fb.group({
    choice: ['', Validators.required ]
  });

  constructor(private quizDataService : QuizDataService, private gameInfoService : GameInfoService, private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  selectedChoice(choice:any) {

    console.log("selected")
    this.choice = choice;
  }

  validate(currentQuestionIndex : number, answer: string) {
    if (this.choice == '') {
      return;
    }

    var correctAnswer = 0;

    if (this.choice == answer) {
      correctAnswer++;
    }

    // put it in the game service
    this.quizDataService.state$.pipe(map(state => {
      return (state.quizData.length == (currentQuestionIndex + 1)? true : false)})).subscribe(isFinished => this.isQuizEnded = isFinished);

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex : currentQuestionIndex + 1), correctAnswer);

    console.log(this.isQuizEnded);

    if (this.isQuizEnded)
    {
      this.gameInfoService.stopCountdown();
      this.quizDataService.registerBestScore(this.gameInfoService.playerScore$);
    }
  }
}
