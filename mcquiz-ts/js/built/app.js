"use strict";
var McQuize = /** @class */ (function () {
    function McQuize() {
        this.quizList = [];
        this.quiz = { question: "", choices: [], correctIdx: -1, commentary: "" };
        // html element
        this.questionEl = document.getElementById("question");
        this.choicesEl = document.getElementById("choices");
    }
    McQuize.prototype.init = function () {
        var _this = this;
        this.loadQuize().then(function (json) {
            _this.quizList = json;
            _this.nextQuestion();
        });
    };
    // controller
    McQuize.prototype.answer = function (e) {
        if (parseInt(e.target.dataset.idx) === this.quiz.correctIdx) {
            alert("正解!!");
            alert(this.quiz.commentary);
            this.nextQuestion();
        }
        else {
            alert("不正解!!");
            e.target.remove();
        }
    };
    // controller
    McQuize.prototype.nextQuestion = function () {
        if (this.quizList.length === 0) {
            alert("おしまい!! お疲れ様でした!!");
            window.location.reload();
        }
        this.quiz = this.quizList.pop();
        this.renderQuize();
    };
    // view
    McQuize.prototype.renderQuize = function () {
        var _this = this;
        this.questionEl.innerHTML = this.quiz.question;
        this.choicesEl.innerHTML = "";
        this.quiz.choices.forEach(function (choice, idx) {
            var liElement = document.createElement("li");
            liElement.setAttribute("data-idx", idx.toString());
            liElement.innerHTML = choice;
            liElement.addEventListener("click", function (e) { _this.answer(e); });
            liElement.classList.add("choice");
            _this.choicesEl.appendChild(liElement);
        });
    };
    //model
    McQuize.prototype.loadQuize = function () {
        return new Promise(function (resolve, reject) {
            fetch("./data.json")
                .then(function (res) {
                return res.json();
            })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return McQuize;
}());
new McQuize().init();
