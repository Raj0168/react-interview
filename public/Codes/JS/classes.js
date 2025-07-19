/**
 * Calculator class for performing basic arithmetic operations.
 * Supports method chaining.
 */
class Calculator {
  /**
   * Creates a new Calculator instance with an initial result of 0.
   */
  constructor() {
    this.res = 0;
  }

  /**
   * Adds a number to the current result.
   *
   * @param {number} num - The number to add.
   * @returns {Calculator} The current Calculator instance (for chaining).
   */
  add(num) {
    this.res += num;
    return this;
  }

  /**
   * Multiplies the current result by a number.
   *
   * @param {number} num - The number to multiply by.
   * @returns {Calculator} The current Calculator instance (for chaining).
   */
  multiply(num) {
    this.res *= num;
    return this;
  }

  /**
   * Returns the current result.
   *
   * @returns {number} The current result.
   */
  display() {
    return this.res;
  }
}

const calculate = new Calculator();
const resCalc = calculate.add(10).multiply(20).display();
console.log(resCalc); // Output: 200
