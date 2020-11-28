(async function ($) {
  const App = {
    init: function () {
      // quize data
      this.quizList = [];

      // current question
      this.question = "";
      this.choices = [];
      this.correctIdx = 0;
      this.commentary = "";

      // html element
      this.$question = $("#question");
      this.$choices = $("#choices");

      this.loadQuize()
        .done(() => {
          this.nextQuestion();
        })
        .fail((err) => {
          console.log(err);
          this.$question.html("クイズの取得に失敗しました。");
        });
    },

    // controller
    answer: function (e) {
      if (parseInt(e.target.dataset.idx) === this.correctIdx) {
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
      this.correctIdx = this.quiz.correctIdx;
      this.commentary = this.quiz.commentary;

      this.renderQuize();
    },

    // view
    renderQuize: function () {
      this.$question.html(this.question);

      this.$choices.html("");
      this.choices.forEach((choice) => {
        // without jsRender
        //const $li = $("<li>", {text: choice,"data-idx": idx,class: "choice"})

        // with jsRender
        const tmpl = $.templates("#tmpl"); // Get compiled template
        const data = { idx: "choice", choice }; // Define data
        const html = tmpl.render(data);

        const $li = $(html);
        $li.on("click", $.proxy(this.answer, this));
        $li.appendTo(this.$choices);
      });
    },

    //model
    loadQuize: function () {
      var deferred = new $.Deferred();

      $.ajax({
        url: "./data.json",
        type: "GET",
        dataType: "json",
      })
        .done((data) => {
          this.quizList = data;
          deferred.resolve();
        })
        .fail((xhr) => {
          deferred.reject(xhr);
        });

      return deferred.promise();
    },
  };

  App.init();
})(window.jQuery);
