(async function () {
  const App = {
    init: async function () {
      // quize data
      this.quizList = [];

      // current question
      this.question = "";
      this.choices = [];
      this.collectIdx = 0;
      this.commentary = "";

      // html element
      this.questionEl = document.getElementById("question");
      this.choicesEl = document.getElementById("choices");

      // html template
      this.template = document.getElementById("template");

      try {
        this.quizList = await this.loadQuize();
        this.nextQuestion();
      } catch (err) {
        console.log(err);
        this.questionEl.insertAdjacentHTML(
          "beforeend",
          "クイズの取得に失敗しました。"
        );
      }
    },

    // controller
    answer: function (e) {
      if (parseInt(e.target.dataset.idx) === this.collectIdx) {
        alert("正解!!");
        alert(this.commentary);
        this.nextQuestion();
      } else {
        alert("不正解!!");
        e.target.remove();
      }
    },

    // controller
    nextQuestion: function () {
      if (this.quizList.length === 0) {
        alert("おしまい!! お疲れ様でした!!");
        window.location.reload();
      }

      this.quiz = this.quizList.pop();
      this.question = this.quiz.question;
      this.choices = this.quiz.choices;
      this.collectIdx = this.quiz.collectIdx;
      this.commentary = this.quiz.commentary;

      this.renderQuize();
    },

    // view
    renderQuize: function () {
      this.questionEl.insertAdjacentHTML("beforeend", this.question);

      this.choicesEl.textContent = "";
      this.choices.forEach(
        function (choice, idx) {
          const liElement = this.template.content.firstElementChild.cloneNode(
            true
          );
          liElement.setAttribute("data-idx", idx);
          liElement.insertAdjacentHTML("beforeend", choice);
          liElement.addEventListener("click", this.answer.bind(this));
          this.choicesEl.appendChild(liElement);
        }.bind(this)
      );
    },

    //model
    loadQuize: async function () {
      try {
        const response = await fetch("./data.json");
        return await response.json();
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  };

  await App.init();
})();
