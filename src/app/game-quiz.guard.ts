import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot  } from '@angular/router';
import { map } from 'rxjs';
import { QuizDataService } from 'src/services/quiz-data.service';

@Injectable({
  providedIn: 'root'
})
export class GameQuizGuard implements CanActivate {
  constructor(private quizDataService : QuizDataService, private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.quizDataService.isLoaded$.pipe(map((isLoaded) => {
        return (isLoaded ? (true) : (this.router.parseUrl('/')));
      }));
  }

}
