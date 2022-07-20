import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { GameInfoService } from 'src/services/game-info.service';
import { QuizDataService } from 'src/services/quiz-data.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

export class AnwserModel {
  choices: string[] = new Array<string>()
  verification : 'none' | 'correct' | 'false' = 'none';
}

@Component({
  selector: 'app-game-quiz',
  templateUrl: './game-quiz.component.html',
  styleUrls: ['./game-quiz.component.scss'],
  providers: [GameInfoService]
})

export class GameQuizComponent implements OnInit {
  oldBestScore = 0;

  vm$ = combineLatest([ this.quizDataService.quizData$, this.quizDataService.quizDataLength$,
    this.gameInfoService.currentQuestionIndex$, this.gameInfoService.countDownEnded$, this.gameInfoService.countDownValueFormated$,
    this.quizDataService.bestScore$, this.gameInfoService.playerScore$ ])
    .pipe(map(([ quizData, quizDataLength, currentQuestionIndex, countDownEnded, countDownValueFormated, bestScore, playerScore ]) => {
      return { quizData, quizDataLength, currentQuestionIndex, countDownEnded, countDownValueFormated, bestScore, playerScore }
    }));

  userChoices : AnwserModel[] = new Array<AnwserModel>();

  choice = '';
  isQuizEnded = false;

  myForm = this.fb.group({
    choice: ['', Validators.required ]
  });

  constructor(private quizDataService : QuizDataService, private gameInfoService : GameInfoService, private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  toggleRadio(currentIndex : number, choice : string) {
    if (this.userChoices.length >= (currentIndex + 1)) {
      if (this.userChoices[currentIndex].choices.length > 0) {
        this.userChoices[currentIndex].choices.length = 0;
        this.userChoices[currentIndex].choices.push(choice);
      }
      else {
        this.userChoices[currentIndex].choices.push(choice);
      }
    }
    else {
      let newUserChoice = new AnwserModel();
      newUserChoice.choices.push(choice);
      this.userChoices.push(newUserChoice);
    }
  }

  toggleCheckBox(currentQuestionIndex : number, choice : string) {
    console.log(`toggle : ${choice}`);
    if (this.userChoices.length >= (currentQuestionIndex + 1))
    {
      console.log("array exist");
      if (this.userChoices[currentQuestionIndex].choices.length > 0)
      {
        let index = this.userChoices[currentQuestionIndex].choices.findIndex((element) => {
          console.log(element === choice);
          return element === choice;
        });
        if (index >= 0)
        {
          console.log("remove from tab");
          this.userChoices[currentQuestionIndex].choices.splice(index, 1);
        }
        else
        {
          console.log("adding in tab");
          this.userChoices[currentQuestionIndex].choices.push(choice);
        }
      }
      else
      {
        console.log("adding in tab");
        this.userChoices[currentQuestionIndex].choices.push(choice);
      }
    }
    else {
      console.log("add new array");
      let newUserChoice = new AnwserModel();
      newUserChoice.choices.push(choice);
      this.userChoices.push(newUserChoice);
    }
    console.log(this.userChoices);
  }

  validateChoice(currentQuestionIndex : number, answer: string) {
    console.log(answer);
    if (this.userChoices.length < (currentQuestionIndex + 1)) {
      return;
    }
    if (this.userChoices[currentQuestionIndex].choices.length == 0)
    {
      return;
    }

    var correctAnswer = 0; // TO DO : put inside service
    if (this.userChoices[currentQuestionIndex].choices.includes(answer)) {
      this.userChoices[currentQuestionIndex].verification = 'correct';
      correctAnswer++;
    }
    else {
      this.userChoices[currentQuestionIndex].verification = 'false';
    }

    // put it in the game service
    this.quizDataService.state$.pipe(map(state => {
      return (state.quizData.length == (currentQuestionIndex + 1)? true : false)})).subscribe(isFinished => this.isQuizEnded = isFinished);

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex : currentQuestionIndex + 1), correctAnswer);

    if (this.isQuizEnded) // TO DO : put inside service
    {
      this.gameInfoService.stopCountdown();
      this.quizDataService.registerBestScore(this.gameInfoService.playerScore$);
    }
  }

  validateText(currentQuestionIndex : number, userChoice : string, answer: string) {
    if (userChoice == "") {
      return;
    }

    // add user choice
    let newUserChoice = new AnwserModel();
    newUserChoice.choices.push(userChoice);
    this.userChoices.push(newUserChoice);

    var correctAnswer = 0; // TO DO : put inside service
    if (userChoice.toLowerCase().trim() == answer.toLowerCase().trim()) {
      this.userChoices[currentQuestionIndex].verification = 'correct';
      correctAnswer++;
    }
    else {
      this.userChoices[currentQuestionIndex].verification = 'false';
    }

    // put it in the game service
    this.quizDataService.state$.pipe(map(state => {
      return (state.quizData.length == (currentQuestionIndex + 1)? true : false)})).subscribe(isFinished => this.isQuizEnded = isFinished);

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex : currentQuestionIndex + 1), correctAnswer);

    if (this.isQuizEnded) // TO DO : put inside service
    {
      this.gameInfoService.stopCountdown();
      this.quizDataService.registerBestScore(this.gameInfoService.playerScore$);
    }
  }

  validateMultiple(currentQuestionIndex : number, answers: string[]) {
    console.log(this.userChoices[currentQuestionIndex].choices);
    console.log(answers);
    if (this.userChoices.length < (currentQuestionIndex + 1)) {
      return;
    }
    if (this.userChoices[currentQuestionIndex].choices.length == 0)
    {
      return;
    }

    var correctAnswer = 0; // TO DO : put inside service
    if (answers.every(answer => this.userChoices[currentQuestionIndex].choices.includes(answer))) {
      this.userChoices[currentQuestionIndex].verification = 'correct';
      correctAnswer++;
    }
    else {
      this.userChoices[currentQuestionIndex].verification = 'false';
    }

    // put it in the game service
    this.quizDataService.state$.pipe(map(state => {
      return (state.quizData.length == (currentQuestionIndex + 1)? true : false)})).subscribe(isFinished => this.isQuizEnded = isFinished);

    this.gameInfoService.updateGameData((this.isQuizEnded ? currentQuestionIndex : currentQuestionIndex + 1), correctAnswer);

    if (this.isQuizEnded) // TO DO : put inside service
    {
      this.gameInfoService.stopCountdown();
      this.quizDataService.registerBestScore(this.gameInfoService.playerScore$);
    }
  }


}
