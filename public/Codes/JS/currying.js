/**
 * Calculator method using currying
 * @param {string} operation - operation performed
 *
 * @returns {number} output
 *
 */
function curriedCalculator(operation) {
  return function (num1) {
    return function (num2) {
      switch (operation) {
        case "add":
          return num1 + num2;
        case "subtract":
          return num1 - num2;
        case "multiply":
          return num1 * num2;
        case "divide":
          return num1 / num2;
        default:
          return -1;
      }
    };
  };
}

const resCalculate = curriedCalculator("add")(1)(10);
console.log("Calculator result:", resCalculate);

/**
 * Infinite currying
 * @param {number} num1 - first number
 *
 * @returns {number} sum of all numbers
 */
function infiniteAdd(num1) {
  return function (num2) {
    if (num2) {
      return infiniteAdd(num1 + num2);
    } else {
      return num1;
    }
  };
}

const resSum = infiniteAdd(1)(2)(3)(10)(4)();

console.log("Infinite currying sum: ", resSum);

function updateElementText(id) {
  return function (content) {
    document.querySelector(`#${id}`).textContent = content;
  };
}

const updateHeading = updateElementText("heading");

const button = document.getElementById("change-button");

button.addEventListener("click", () => {
  updateHeading("updated text");
});
