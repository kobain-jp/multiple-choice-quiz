"use strict";
class McQuize {
  constructor() {
    this.quizList = [];
    this.quiz = { question: "", choices: [], correctIdx: -1, commentary: "" };
    // html element
    this.questionEl = document.getElementById("question");
    this.choicesEl = document.getElementById("choices");
  }
  init() {
    this.loadQuize().then((json) => {
      this.quizList = json;
      this.nextQuestion();
    });
  }
  // controller
  answer(e) {
    if (parseInt(e.target.dataset.idx) === this.quiz.correctIdx) {
      alert("正解!!");
      alert(this.quiz.commentary);
      this.nextQuestion();
    } else {
      alert("不正解!!");
      e.target.remove();
    }
  }
  // controller
  nextQuestion() {
    if (this.quizList.length === 0) {
      alert("おしまい!! お疲れ様でした!!");
      window.location.reload();
    }
    this.quiz = this.quizList.pop();
    this.renderQuize();
  }
  // view
  renderQuize() {
    this.questionEl.innerHTML = this.quiz.question;
    this.choicesEl.innerHTML = "";
    this.quiz.choices.forEach((choice, idx) => {
      const liElement = document.createElement("li");
      liElement.setAttribute("data-idx", idx.toString());
      liElement.innerHTML = choice;
      liElement.addEventListener("click", (e) => {
        this.answer(e);
      });
      liElement.classList.add("choice");
      this.choicesEl.appendChild(liElement);
    });
  }
  //model
  loadQuize() {
    return new Promise((resolve, reject) => {
      fetch("./data.json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
new McQuize().init();
