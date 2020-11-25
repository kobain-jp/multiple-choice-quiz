(async function (window) {
  function App() {
    this.model = new window.app.Model();
    this.view = new window.app.View();
    this.controller = new window.app.Controller(this.model, this.view);
  }

  const app = new App();
  app.controller.init();
})(window);
