import { Injectable } from '@angular/core';
import { BehaviorSubject, take, interval, map } from 'rxjs';
import { QuizDataService } from './quizData.service';

export interface TimerData {
  timerEnded : boolean
}

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  timerState = new BehaviorSubject<TimerData>({
      timerEnded : false
    });

    intervalObj : any;
    countdown = 120;
    timerEnded = false;

  constructor(private quizDataService : QuizDataService) {}

  startCountdown() {
    this.intervalObj = interval(1000).subscribe(val => {
      this.countdown--;
      if (this.countdown == 0) {
        this.countdown = 60;

        this.timerState.next({timerEnded : true});

        this.stopCountdown();
      }
    });
  }

  stopCountdown() {
    this.intervalObj.unsubscribe();
  }

  resetTimer() {
    this.stopCountdown();
    this.startCountdown();
    this.timerState.next({timerEnded : false});
  }

  convertCounterToStringTime() : string
  {
    let minutes = Math.floor(this.countdown / 60);
    let secondes = Math.floor(this.countdown % 60);
    let timer = (minutes < 10 ? '0'+ minutes : minutes) + ':' + (secondes < 10 ? '0'+ secondes : secondes);
    return timer;
  }
}
