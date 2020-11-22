class MultipleChoiceQuize {

    constructor(calledByBuilder) {

        if (calledByBuilder === undefined) {
            throw new Error("please use MultipleChoiceQuizeBuilder.build() instead");
        }

    }

    async init() {
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

        try {
            this.quizList = await this.loadQuize();
            this.nextQuestion();
        } catch (err) {
            console.log(err);
            this.questionEl.innerHTML = "クイズの取得に失敗しました。"
        }

    }

    // controller
    answer(e) {
        if (parseInt(e.target.dataset.idx) === this.collectIdx) {
            alert("正解!!");
            alert(this.commentary);
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
        this.question = this.quiz.question;
        this.choices = this.quiz.choices;
        this.collectIdx = this.quiz.collectIdx;
        this.commentary = this.quiz.commentary;

        this.renderQuize();
    }

    // view
    renderQuize() {
        this.questionEl.innerHTML = this.question;

        this.choicesEl.innerHTML = "";
        this.choices.forEach(function (choice, idx) {
            const liElement = document.createElement("li");
            liElement.setAttribute("data-idx", idx);
            liElement.innerHTML = choice;
            liElement.addEventListener("click", this.answer.bind(this));
            liElement.classList.add("choice");
            this.choicesEl.appendChild(liElement);
        }.bind(this));
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



class MultipleChoiceQuizeBuilder {

    static async build() {
        const multipleChoiceQuize = new MultipleChoiceQuize(true);
        await multipleChoiceQuize.init();
        return multipleChoiceQuize;
    }

}

export { MultipleChoiceQuizeBuilder, MultipleChoiceQuize };

