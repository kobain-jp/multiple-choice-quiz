var quizList = [];
var question = "";
var choices = [];
var correctIdx = -1;
var commentary = "";

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

// controller logic
function answer(e) {
  if (choices[correctIdx] === e.target.value) {
    alert("OK");
    alert(commentary);
    nextQuestion();
  } else {
    alert("NG");
    e.target.remove();
  }
}

// view logic
function render() {
  questionElement.innerHTML = question;
  choicesElement.textContent = "";
  choices.forEach(function (choice) {
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "button");
    inputElement.setAttribute("value", choice);
    inputElement.addEventListener("click", answer);

    choicesElement.appendChild(inputElement);
  });
}

function nextQuestion() {
  var quiz = quizList.shift();
  // setdata
  question = quiz.question;
  choices = quiz.choices;
  correctIdx = quiz.correctIdx;
  commentary = quiz.commentary;

  // render
  render();
}

function loadQuizList() {
  var deferred = new $.Deferred();
  jQuery
    .ajax({
      url: "./data.json",
      type: "GET",
      dataType: "json",
    })
    .done((data) => {
      quizList = data;
      deferred.resolve();
      console.log("A");
    });
  console.log("B");
  return deferred.promise();
}

loadQuizList().done(nextQuestion);
console.log("C");
