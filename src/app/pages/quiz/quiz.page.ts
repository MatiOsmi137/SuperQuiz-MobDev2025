import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonButton, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonList } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonList, IonCardTitle, IonCard, IonCardHeader, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuizPage implements OnInit {

  public data = inject(DataService);
  public questionSet: Question[] = [];
  public pointer: number = 0;
  public currentElement: Question = this.questionSet[0];
  public userScore: number = 0;

  constructor() { }

  ngOnInit() 
  {
    this.data.loadQuiz();
    this.questionSet = this.data.shuffleArray(this.data.currentQuiz.questions);
    
    if (this.questionSet.length > 0) {
      this.currentElement = this.questionSet[0];
      this.currentElement.title = this.currentElement.title.replace(/\n/g, ' ');
    }
  }
  

  answer(c: number): boolean
  {
    if (c == this.currentElement.correct)
    {
      this.userScore += 1;
      this.goToNextQuestion();
      return true;
    }
    else
    {
      return false;
    }
  }

  goToNextQuestion()
  {
    this.pointer += 1;
    if (this.pointer < this.questionSet.length) {
      this.currentElement = this.questionSet[this.pointer];
    }
  }
}
