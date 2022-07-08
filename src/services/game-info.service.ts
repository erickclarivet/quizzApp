import { Injectable } from '@angular/core';
import { BehaviorSubject, map, distinctUntilChanged, interval } from 'rxjs';

export interface GameData {
  currentQuestionIndex: number,
  playerScore : number,
  countDownEnded : boolean,
  countDownValue : number
}

const initialCountDownValue = 120;

@Injectable()

export class GameInfoService {

  ngOnDestroy(): void {
  }

  private state = new BehaviorSubject<GameData>({
    currentQuestionIndex: 0,
    playerScore : 0,
    countDownEnded : false,
    countDownValue : initialCountDownValue
  });

  currentQuestionIndex$ = this.state.pipe(map((gameData) => gameData.currentQuestionIndex), distinctUntilChanged());
  playerScore$ = this.state.pipe(map((gameData) => gameData.playerScore), distinctUntilChanged());
  countDownEnded$ = this.state.pipe(map((state) => state.countDownEnded), distinctUntilChanged());
  countDownValueFormated$ = this.state.pipe(map((state) => {
    let minutes = Math.floor(state.countDownValue / 60);
    let secondes = Math.floor(state.countDownValue % 60);
    let timer = (minutes < 10 ? '0'+ minutes : minutes) + ':' + (secondes < 10 ? '0'+ secondes : secondes);
    return timer;
  })
  , distinctUntilChanged());
  interval$ = interval(1000).subscribe(() => {
    let countDownValue = this.state.value.countDownValue - 1;
    let countDownEnded = false;

    if (countDownValue == 0) {
      countDownValue = initialCountDownValue;
      countDownEnded = true;
      this.stopCountdown();
    }
    this.state.next({currentQuestionIndex : this.state.value.currentQuestionIndex,
      playerScore : this.state.value.playerScore,
      countDownEnded :  countDownEnded,
      countDownValue : countDownValue
      });
  });

  constructor() {}

  updateGameData(newIndex : number, additionalPoints : number) {

    this.state.next({
      currentQuestionIndex : newIndex,
      playerScore : this.state.value.playerScore + additionalPoints,
      countDownEnded :  this.state.value.countDownEnded,
      countDownValue : this.state.value.countDownValue
    });
  }

  // Make it works
  registerBestScore() {
    this.state.next({
      currentQuestionIndex : this.state.value.currentQuestionIndex,
      playerScore : this.state.value.playerScore,
      countDownEnded :  this.state.value.countDownEnded,
      countDownValue : this.state.value.countDownValue
      // bestScore : (this.playerScore > this.bestScore ? this.playerScore : this.bestScore)
    });
  }

  restartCountdown() {
    this.state.next({
      currentQuestionIndex: 0,
      playerScore : 0,
      countDownEnded :  false,
      countDownValue : initialCountDownValue
    });
  }

  stopCountdown() {
    this.interval$.unsubscribe();
  }

  convertCounterToStringTime() : string
  {
    let minutes = Math.floor(this.state.value.countDownValue / 60);
    let secondes = Math.floor(this.state.value.countDownValue % 60);
    let timer = (minutes < 10 ? '0'+ minutes : minutes) + ':' + (secondes < 10 ? '0'+ secondes : secondes);
    return timer;
  }
}
