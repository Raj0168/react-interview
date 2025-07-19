// Functions - Hoisting, Scope, Callback, Arrow function

/**
 * first order functions and IIFE.
 * @returns greet message.
 */
function greet() {
  const timeNow = new Date().getHours();
  let timeOfDay = "day";

  if (timeNow > 5 && timeNow < 12) {
    timeOfDay = "morning";
  } else if (timeNow >= 12 && timeNow < 16) {
    timeOfDay = "afternoon";
  } else if (timeNow >= 16 && timeNow < 20) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  return `Good ${timeOfDay}!`;
}

(function displayGreeting(question) {
  console.log(greet(), question);
})("How are you?");

// nested IIFE
(function (x) {
  return (function (y) {
    console.log("val: ", x); //1
  })(2);
})(1);

var x = 10;
/**
 * variable hoisting in js
 */
(function hoisting() {
  console.log("x: ", x); // undefined
  var x = 20;
})();

/**
 * spread/rest operators demo
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @param {number[]} nums - Spread operator to collect numbers.
 */
const spreadFunction = (a, b, ...nums) => {
  console.log("spread variables: ", ...nums);
};

spreadFunction(1, 2, 3, 4, 5);

/**
 * Method chaining (not recommended)
 */
function Calculator() {
  this.res = 0;
}

Calculator.prototype.add = function (num) {
  this.res += num;
  return this;
};

Calculator.prototype.multiply = function (num) {
  this.res *= num;
  return this;
};

Calculator.prototype.display = function (num) {
  return this.res;
};

const calculate = new Calculator();
const resCalc = calculate.add(10).multiply(20).display();
console.log(resCalc);
