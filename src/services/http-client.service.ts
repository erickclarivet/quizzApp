import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

export interface QuizData {
  label: string;
  answerType: "choice" | "text" | "multiple-choice";
  choices: string[];
  answer: string;
  answers: string[];
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  private quizzDataUrl = "./assets/quizz-input-full.json";

  constructor(private http : HttpClient) {}

  getQuizData() {
    return this.http.get<QuizData[]>(this.quizzDataUrl).pipe(delay(2000));
  }
}
