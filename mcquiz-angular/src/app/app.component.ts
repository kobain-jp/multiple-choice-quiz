import { Component, OnInit } from '@angular/core';
import { Quiz } from './quiz';
import { MOCK_QUIZ_LIST } from './mock-quiz-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'McQuiz-angular';

  quizList: Array<Quiz | undefined>;
  quiz: Quiz;

  constructor() {
    this.quizList = [];
    this.quiz = { question: "", choices: [], correctIdx: -1, commentary: "" };
  }

  // controller
  answer(e: Event): void {
    if (parseInt((e.target as HTMLElement).dataset.idx!) === this.quiz.correctIdx) {
      alert("正解!!");
      alert(this.quiz.commentary);
      this.nextQuestion();
    } else {
      alert("不正解!!");
      (e.target as HTMLElement).style.display = "none";
    }
  }

  // controller
  nextQuestion(): void {
    if (this.quizList.length === 0) {
      alert("おしまい!! お疲れ様でした!!");
      window.location.reload();
    }
    this.quiz = this.quizList.pop()!;
  }

  //model
  loadQuize(): Promise<any> {
    return new Promise((resolve, reject) => {
      // mock data
      resolve(MOCK_QUIZ_LIST);

    });
  }

  ngOnInit() {
    this.loadQuize().then((json: Array<Quiz>) => {
      this.quizList = json;
      this.nextQuestion();
    })
  }
}
