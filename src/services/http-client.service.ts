import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

export interface QuizData {
  label: string;
  answerType: string;
  choices: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  private quizzDataUrl = "./assets/quizz-input.json";

  constructor(private http : HttpClient) {}

  getQuizData() {
    return this.http.get<QuizData[]>(this.quizzDataUrl).pipe(delay(2000));
  }
}
