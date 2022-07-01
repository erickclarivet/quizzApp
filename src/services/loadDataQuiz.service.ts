import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoadDataQuizState {
  isLoaded : boolean
}

@Injectable({
  providedIn: 'root'
})

export class LoadDataQuizService {
  state = new BehaviorSubject<LoadDataQuizState>({
    isLoaded : false
  })

  isLoaded = false;

  constructor() {}

  dataQuizLoaded()
  {
    this.state.next({
      isLoaded : true
    });
  }
}
