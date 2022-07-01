import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameQuizComponent } from './game-quiz/game-quiz.component';
import { GameQuizGuard } from './game-quiz.guard';

const routes : Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path : 'game-Quiz',
    component: GameQuizComponent,
    canActivate: [GameQuizGuard]
  },

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameQuizComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
