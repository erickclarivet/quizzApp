import { Injectable } from '@angular/core';
import { async, BehaviorSubject, map } from 'rxjs';
import { QuizDataService } from './quizData.service';

export interface GameData {
  currentQuestionIndex: number,
  playerScore : number,
  // bestScore : number
}

@Injectable({
  providedIn: 'root'
})

export class GameInfoService {
  public gameState = new BehaviorSubject<GameData>({
    currentQuestionIndex: 0,
    playerScore : 0,
    // bestScore : 0
  });

  playerScore = 0;

  constructor(private quizDataService : QuizDataService) {

  }

  updateGameData(newIndex : number, newPlayerScore : number) {
    this.gameState.subscribe(state => {
        console.log('player score: ' + state.playerScore);
        this.playerScore = state.playerScore + newPlayerScore;
      });

      this.gameState.next({
        currentQuestionIndex : newIndex,
        playerScore : this.playerScore
        // bestScore : newBestScore
      });
  }
}
