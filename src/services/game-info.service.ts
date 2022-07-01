import { Injectable } from '@angular/core';
import { async, BehaviorSubject, map } from 'rxjs';
import { QuizDataService } from './quizData.service';
import { Router } from '@angular/router'

export interface GameData {
  currentQuestionIndex: number,
  playerScore : number,
  bestScore : number
}

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {

  public gameState = new BehaviorSubject<GameData>({
    currentQuestionIndex: 0,
    playerScore : 0,
    bestScore : 0
  });

  playerScore = 0;
  bestScore =  0;
  currentQuestionIndex = 0;

  constructor(private quizDataService : QuizDataService, private router: Router) {

  }

  updateGameData(newIndex : number, additionalPoints : number) {
    this.gameState.subscribe(state => {
        this.playerScore = state.playerScore + additionalPoints;
        this.bestScore = state.bestScore;
        this.currentQuestionIndex = state.currentQuestionIndex
      });

      this.gameState.next({
        currentQuestionIndex : newIndex,
        playerScore : this.playerScore,
        bestScore :  this.bestScore
      });
  }

  registerBestScore() {
    this.gameState.next({
      currentQuestionIndex : this.currentQuestionIndex,
      playerScore : this.playerScore,
      bestScore : (this.playerScore > this.bestScore ? this.playerScore : this.bestScore)
    });
  }

  restart() {
    this.gameState.next({
      currentQuestionIndex: 0,
      playerScore : 0,
      bestScore : this.bestScore
    });
  }
}
