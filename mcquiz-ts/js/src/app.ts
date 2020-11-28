interface Quiz {
    question: string,
    choices: Array<string>,
    correctIdx: number,
    commentary: string
}

class McQuize {
    quizList: Array<Quiz | undefined>;
    quiz: Quiz;

    questionEl: HTMLElement;
    choicesEl: HTMLElement;


    constructor() {
        this.quizList = [];
        this.quiz = { question: "", choices: [], correctIdx: -1, commentary: "" };
        // html element
        this.questionEl = document.getElementById("question")!;
        this.choicesEl = document.getElementById("choices")!;
    }

    init(): void {
        this.loadQuize().then((json: Array<Quiz>) => {
            this.quizList = json;
            this.nextQuestion();
        })
    }

    // controller
    answer(e: Event): void {
        if (parseInt((e.target as HTMLElement).dataset.idx!) === this.quiz.correctIdx) {
            alert("正解!!");
            alert(this.quiz.commentary);
            this.nextQuestion();
        } else {
            alert("不正解!!");
            (e.target as HTMLElement).remove();
        }
    }

    // controller
    nextQuestion(): void {
        if (this.quizList.length === 0) {
            alert("おしまい!! お疲れ様でした!!");
            window.location.reload();
        }

        this.quiz = this.quizList.pop()!;

        this.renderQuize();
    }

    // view
    renderQuize(): void {
        this.questionEl.innerHTML = this.quiz!.question;

        this.choicesEl.innerHTML = "";
        this.quiz.choices.forEach(
            (choice: string, idx: number) => {
                const liElement = document.createElement("li");
                liElement.setAttribute("data-idx", idx.toString());
                liElement.innerHTML = choice;
                liElement.addEventListener("click", (e: Event) => { this.answer(e); });
                liElement.classList.add("choice");
                this.choicesEl!.appendChild(liElement);
            }
        );
    }

    //model
    loadQuize(): Promise<any> {
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