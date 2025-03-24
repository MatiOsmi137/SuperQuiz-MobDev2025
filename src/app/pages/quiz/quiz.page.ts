import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/Question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuizPage implements OnInit {

  public data = inject(DataService);
  public questionSet: Question[] = [];
  public pointer: number = 0;
  public currentElement: Question = this.questionSet[0];

  constructor() { }

  ngOnInit() 
  {
    let questionSet: Question[] = this.data.shuffleArray(this.data.currentQuiz.questions);
    let currentElement: Question = questionSet[0];
  }

  goToNextQuestion()
  {
    this.pointer += 1;
    let currentElement = this.questionSet[this.pointer];
  }
}
