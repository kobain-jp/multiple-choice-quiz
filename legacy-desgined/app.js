const quizList = [];
quizList.push({
    question: "バックトゥザフューチャーシリーズに出演していない人は誰？",
    choices: ["フリー(レッチリのベーシスト)", "イライジャ・ウッド(ロードオブザリングの主人公役)", "ドナルド・トランプ(元アメリカ大統領)"],
    collectIdx: 2,
    commentary: "ビフのモデルはトランプ大統領だが、本人は出演していない。\nフリーはマーティの同級生のニードルス、イライジャは2のカフェ80で出演しています。"
});
quizList.push({
    question: "中国語でLoginはどれ",
    choices: ["登录", "注册", "忘记密码"],
    collectIdx: 0,
    commentary: "登录はSign upみたいですがLoginです。\nSign upは注册。\n忘记密码はログインページに必ずあるあれです。"
});
quizList.push({
    question: "栃木県宇都宮市と関係ないものはどれ？",
    choices: ["餃子", "焼きそば", "干し芋", "レモン牛乳", "大谷石地下採掘場跡"],
    collectIdx: 2,
    commentary: "餃子は正嗣、焼きそばは石田屋がおすすめです。\n運動会の思い出はレモン牛乳です。\n大谷石地下採掘場跡はまるでドラクエの洞窟"
});

// current question
let question = "";
let choices = [];
let collectIdx = 0;
let commentary = "";

// html element
const questionEl = document.getElementById("question");
const choiceEl = document.getElementById("choices");

// controller
function answer(e) {
    if (parseInt(e.target.dataset.idx) === collectIdx) {
        alert("正解!!");
        alert(commentary);
        nextQuestion();
    } else {
        alert("不正解!!");
        e.target.remove();
    }

}

// controller
function nextQuestion() {
    if (quizList.length === 0) {
        alert("おしまい!! お疲れ様でした!!");
        window.location.reload();
    }

    const quiz = quizList.pop();
    question = quiz.question;
    choices = quiz.choices;
    collectIdx = quiz.collectIdx;
    commentary = quiz.commentary;

    renderQuize();
}

// view
function renderQuize() {
    questionEl.innerHTML = question;

    choiceEl.innerHTML = "";
    choices.forEach(function (choice, idx) {
        const liElement = document.createElement("li");
        liElement.setAttribute("data-idx", idx);
        liElement.innerHTML = choice;
        liElement.addEventListener("click", answer);
        liElement.classList.add("choice");
        choiceEl.appendChild(liElement);
    });

}

nextQuestion();