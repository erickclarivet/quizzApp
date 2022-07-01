import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, interval, timeout } from 'rxjs';
import { QuizDataService } from './quizData.service';

export interface TimerData {
  time : number
}

@Injectable({
  providedIn: 'root'
})

export class NameService {

  timerState = new BehaviorSubject<TimerData>({ time : 60000 });
  timer = 0;
  // obs$ = interval(60000);

  constructor(private quizDataService : QuizDataService) {}

  updateTimer() {

  }
}
