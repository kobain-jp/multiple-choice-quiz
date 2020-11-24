(function (window) {

    function Controller(model, view) {
        this.model = model;
        this.view = view;
    }

    Controller.prototype.init = async function () {
        try {
            await this.model.fetch();
            this.nextQuestion();
        } catch (err) {
            console.log(err);
            this.view.questionEl.innerHTML = "クイズの取得に失敗しました。"
        }

    }

    Controller.prototype.answer = function (e) {
        if (parseInt(e.target.dataset.idx) === this.model.quiz.collectIdx) {
            alert("正解!!");
            alert(this.model.quiz.commentary);
            this.nextQuestion();
        } else {
            alert("不正解!!");
            e.target.remove();
        }
    }

    Controller.prototype.nextQuestion = function () {
        if (this.model.quizList.length === 0) {
            alert("おしまい!! お疲れ様でした!!");
            window.location.reload();
        }

        this.model.quiz = this.model.quizList.pop();

        this.view.renderQuize(this.model.quiz);
        this.view.bind("answer", this.answer.bind(this));
    }



    window.app = window.app || {};
    window.app.Controller = Controller;

}(window));