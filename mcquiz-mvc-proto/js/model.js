(function (window) {
  function Model() {
    this.quizList = [];
    this.quize = {};
  }

  Model.prototype.fetch = async function () {
    try {
      const response = await fetch("./data.json");
      this.quizList = await response.json();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
