
// current question
let question = "javascriptがjavaとついている理由は？";
let choices = ["javaのようにjvm上で動くため", "javaのコードをそのままかいても動くため", "javaがその時流行っていたから"];
let collectIdx = 1;
let commentary = "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。";

// set html element to variables 
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

function answer(e) {
    console.log(e.target);
    console.log(e.target.value);

    if (choices[collectIdx] === e.target.value) {
        alert('正解');
        alert(commentary);
        nextQuestion();
    } else {
        e.target.remove();
    }

}

function nextQuestion() {
    question = "background: linear-gradientはどのような効果？";
    choices = ["背景に線形グラデーションを表示する", "背景に反復線形グラデーションを表示する"];
    collectIdx = 0;
    commentary = "background: linear-gradient(45deg, #005BAC, #5EC2C6); -> あれ、どっかでみたことあるかも";

    render();

}


// view
function render() {

    questionElement.innerHTML = question;

    choicesElement.innerHTML = ""
    choices.forEach(function (choice, idx) {

        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "button");
        inputElement.setAttribute("value", choices[idx]);
        inputElement.addEventListener("click", answer);
        choicesElement.appendChild(inputElement);

    });
}

render();