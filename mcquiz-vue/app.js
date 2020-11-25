
const app = new Vue({
    el: '#app',
    data: {
        // data list
        quizList: [],
        // current data
        question: "",
        choices: [],
        collectIdx: 0,
        commentary: "",

    },
    methods: {
        answer: function (e) {
            if (parseInt(e.target.dataset.idx) === this.collectIdx) {
                alert("正解!!");
                alert(this.commentary);
                this.nextQuestion();
            } else {
                alert("不正解!!");
                //e.target.remove();
                //FIX ME
            }

        },
        nextQuestion: function () {
            if (this.quizList.length === 0) {
                alert("おしまい!! お疲れ様でした!!");
                window.location.reload();
            }

            const quiz = this.quizList.shift();
            this.question = quiz.question;
            this.choices = quiz.choices;
            this.collectIdx = quiz.collectIdx;
            this.commentary = quiz.commentary;

        }, loadQuize: function () {

            return new Promise((resolve, reject) => {

                axios
                    .get('./data.json')
                    .then((res) => {
                        resolve(res.data);
                    }).catch((err) => {
                        reject(err);
                    });

            });


        }

    }, mounted: function () {
        this.loadQuize().then((json) => {
            this.quizList = json;
            this.nextQuestion();
        }).catch((err) => {
            console.log(err);
            // questionEl.innerHTML = "クイズの取得に失敗しました。"
            // FIX ME
        });
    }
})








