import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { LoadDataQuizService } from './loadDataQuiz.service';

interface QuizData {
  label: string;
  answerType: string;
  choices: string[];
  answer: string;
}

export interface QuizDataState {
  quizData : any[]
}

@Injectable({
  providedIn: 'root'
})

export class QuizDataService {
  state = new BehaviorSubject<QuizDataState>({ quizData : []});

  constructor(private http : HttpClient, private loadDataQuizService : LoadDataQuizService) {}

  loadDataQuiz(): void {
    this.http.get<QuizData[]>("./assets/quizz-input.json").pipe(delay(2000)).subscribe((data) => {
      console.log('hello');
      this.state.next({ quizData : data });
      this.loadDataQuizService.dataQuizLoaded();
    });
  }
}
