import { Injectable } from '@angular/core';
import { BehaviorSubject, map, distinctUntilChanged, Observable, take } from 'rxjs';
import { HttpClientService, QuizData } from './http-client.service';

export interface QuizDataState {
  quizData : QuizData[],
  isLoaded : boolean,
  bestScore : number
}

@Injectable({
  providedIn: 'root'
})

export class QuizDataService {
  private state = new BehaviorSubject<QuizDataState>({ quizData : [], isLoaded : false, bestScore : 0});

  state$ = this.state.asObservable();
  isLoaded$ = this.state.pipe(map((state) => state.isLoaded), distinctUntilChanged());
  bestScore$ = this.state.pipe(map((state) => state.bestScore), distinctUntilChanged());
  quizDataLength$ = this.state.pipe(map((state) => state.quizData.length), distinctUntilChanged());
  quizData$ = this.state.pipe(map((state) => state.quizData), distinctUntilChanged());

  constructor(private httpService : HttpClientService) {}

  loadDataQuiz() {
    this.httpService.getQuizData().subscribe((data) => {
      this.state.next({ quizData : data, isLoaded : true, bestScore : this.state.value.bestScore });
    });
  }

  registerBestScore(playerScore$: Observable<number>) {

    playerScore$.pipe(take(1)).subscribe((score) => { // Ask to shellman the god better solution
      this.state.next({
        quizData : this.state.value.quizData,
        isLoaded : this.state.value.isLoaded,
        bestScore : (score > this.state.value.bestScore ? score : this.state.value.bestScore)
      });
    });
  }
}
