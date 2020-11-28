export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    try {
      await this.model.fetch();
      this.nextQuestion();
    } catch (err) {
      console.log(err);
      this.view.questionEl.insertAdjacentHTML(
        "beforeend",
        "クイズの取得に失敗しました。"
      );
    }
  }

  answer(e) {
    if (parseInt(e.target.dataset.idx) === this.model.quiz.correctIdx) {
      alert("正解!!");
      alert(this.model.quiz.commentary);
      this.nextQuestion();
    } else {
      alert("不正解!!");
      e.target.remove();
    }
  }

  nextQuestion() {
    if (this.model.quizList.length === 0) {
      alert("おしまい!! お疲れ様でした!!");
      window.location.reload();
    }

    this.model.quiz = this.model.quizList.pop();

    this.view.renderQuize(this.model.quiz);
    this.view.bind("answer", this.answer.bind(this));
  }
}
