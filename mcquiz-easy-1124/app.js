var question = "javascriptがjavaとついている理由は？";
var choices = [
  "jvmで動くから",
  "javaと全く同じ構文で動くから",
  "当時Javaが流行っていたから",
];
var collectIdx = 2;
var commentary =
  "Java is to JavaScript as Car is to Carpetと言われていれるぐらいjavaとjavascriptは違います。";

const questionElement = document.getElementById("question");
questionElement.innerHTML = question;

const choicesElement = document.getElementById("choices");

choices.forEach(function (choice) {
  var inputElement = document.createElement("input");
  inputElement.setAttribute("type", "button");
  inputElement.setAttribute("value", choice);
  inputElement.addEventListener("click", answer);

  choicesElement.appendChild(inputElement);
});

function answer(e) {
  if (choices[collectIdx] === e.target.value) {
    alert("OK");
    alert(commentary);
  } else {
    alert("NG");
    e.target.remove();
  }
}
