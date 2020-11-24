(function (window) {

    function View() {
        this.questionEl = document.getElementById("question");
        this.choicesEl = document.getElementById("choices");
    }

    View.prototype.bind = function (event, handler) {
        if (event === "answer") {
            document.querySelectorAll(".choice").forEach((element, idx) => {
                element.addEventListener("click", handler);
            });
        }
    }


    View.prototype.renderQuize = function (quize) {
        this.questionEl.innerHTML = quize.question;
        this.choicesEl.innerHTML = "";
        quize.choices.forEach(function (choice, idx) {
            const liElement = document.createElement("li");
            liElement.setAttribute("data-idx", idx);
            liElement.innerHTML = choice;
            liElement.classList.add("choice");
            this.choicesEl.appendChild(liElement);
        }.bind(this));
    }

    window.app = window.app || {};
    window.app.View = View;

}(window));
