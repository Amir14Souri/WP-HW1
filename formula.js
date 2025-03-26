class FormulaElement extends HTMLElement {
  constructor() {
    super();
    this.innerText = ":)";
  }

  connectedCallback() {
    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", this.evaluateFormaula.bind(this));
    });
  }

  evaluateFormaula() {
    let expression = this.getAttribute("evaluator");
    const inputs = document.querySelectorAll("input");
    const values = {};

    inputs.forEach((input) => {
      values[input.id] = parseFloat(input.value) || 0;
    });

    if (Object.values(values).includes(0)) {
      this.innerHTML = ":)";
      return;
    }

    for (const name in values) {
      const value = values[name];
      while (expression.includes(name))
        expression = expression.replace(name, value);
    }

    try {
      const pi = Math.PI;
      const evaluatedValue = eval(expression);
      this.innerText = parseInt(evaluatedValue * 100) / 100;
    } catch (error) {
      this.innerText = "فرمول نامعتبر";
      console.error("Evaluation Error:", error);
    }
  }
}

customElements.define("my-formula", FormulaElement);
