import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forRoot(routes),
    MatButtonModule, // TODO: create Material module
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
