import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoadDataQuizService } from 'src/services/loadDataQuiz.service';

@Injectable({
  providedIn: 'root'
})
export class GameQuizGuard implements CanActivate {
  constructor(private loadQuizDataService : LoadDataQuizService, private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loadQuizDataService.state.asObservable().pipe(map((state) => {
        return (state.isLoaded ? (true) : (this.router.parseUrl('/'))); // or return false, but will block the routing and not routes it to 'home'
      }));
      return true;
  }

}
