// quize data
let quizList = [];

// current question
let question = "";
let choices = [];
let collectIdx = 0;
let commentary = "";

// html element
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");

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

    choicesEl.innerHTML = "";
    choices.forEach(function (choice, idx) {
        const liElement = document.createElement("li");
        liElement.setAttribute("data-idx", idx);
        liElement.innerHTML = choice;
        liElement.addEventListener("click", answer);
        liElement.classList.add("choice");
        choicesEl.appendChild(liElement);
    });

}

//model
async function loadQuize() {

    try {
        const response = await fetch("./data.json");
        return await response.json();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }

}

//controller
async function init() {
    try {
        quizList = await loadQuize();
        nextQuestion();
    } catch (err) {
        console.log(err);
        questionEl.innerHTML = "クイズの取得に失敗しました。"
    }
}

init();

