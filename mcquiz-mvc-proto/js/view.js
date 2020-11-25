(function (window) {
  function View() {
    this.questionEl = document.getElementById("question");
    this.choicesEl = document.getElementById("choices");

    this.template = " <li class='choice' data-idx='{{data-idx}}'>{{text}}</li>";
  }

  View.prototype.bind = function (event, handler) {
    if (event === "answer") {
      document.querySelectorAll(".choice").forEach((element) => {
        element.addEventListener("click", handler);
      });
    }
  };

  View.prototype.renderQuize = function (quize) {
    this.questionEl.innerHTML = quize.question;
    this.choicesEl.textContent = "";
    let html = "";
    quize.choices.forEach(
      function (choice, idx) {
        let compiled = this.template;
        compiled = compiled.replace("{{data-idx}}", idx);
        compiled = compiled.replace("{{text}}", choice);
        html = html + compiled;
      }.bind(this)
    );

    this.choicesEl.insertAdjacentHTML("beforeend", html);
  };

  window.app = window.app || {};
  window.app.View = View;
})(window);
