// closures

/**
 * Closures example - return random number
 * @param {number} range - range of the random number
 *
 * @returns random number in the range.
 */
function returnRandomValue(range) {
  const random = Math.floor(Math.random() * (range ?? 1000)) + 1;

  function displayRandom() {
    console.log("Random Number: ", random);
  }

  return displayRandom;
}

const randomObject = returnRandomValue(100);
randomObject();
returnRandomValue()();

/**
 * Closures example - private counter
 */
const privateCounter = () => {
  let _counter = 0;

  function increment() {
    _counter += 1;
  }

  function display() {
    return _counter;
  }

  return { increment, display };
};

const counter = privateCounter();
counter.increment();
counter.increment();
const resCounter = counter.display();

console.log("Count: ", resCounter);

/**
 * Closures example - create base and perform operation
 */
const createBase = (base) => {
  return function add(num) {
    return num + base;
  };
};

var addFive = createBase(5);
console.log(addFive(5));
console.log(addFive(10));

/**
 * Closures example - time optimization
 */
function findNumber() {
  let a = [];
  for (let i = 0; i < 1_000_000; i++) {
    a[i] = i ** 2;
  }
  return function (index) {
    console.log(a[index]);
  };
}

const closureFind = findNumber();

console.time("10");
closureFind(10);
console.timeEnd("10");
console.time("12");
closureFind(12);
console.timeEnd("12");

/**
 * Closures example - block scope and setTimeout
 */
for (var i = 0; i < 3; i++) {
  (function inner(i) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  })(i);
}

/**
 * Closures example - Module pattern: create
encapsulated modules with private and public parts. It helps to organize code, prevent global
scope pollution, and promote reusability.
 */
const myModule = (function () {
  const _value = "oooweeee";

  const privateMethod = () => {
    return "private method";
  };

  return {
    publicMethod: function () {
      console.log("public method");
      console.log(privateMethod());
    },
    getPrivateValue: function () {
      return _value;
    },
  };
})();

myModule.publicMethod();
const privateVal = myModule.getPrivateValue();
console.log("Private value:", privateVal);

let city = "Paris";
/**
 * Closures example - run a function only once
 *
 * @returns string on condition if it is run once or more.
 */
function shouldRunOnce() {
  let called = true;
  city = "Berlin";

  return function () {
    if (called) {
      console.log("Welcome to", city);
      called = false;
    } else {
      console.log("Come on in.");
    }
  };
}

const welcome = shouldRunOnce();
welcome();
welcome();
welcome();

/**
 * Closures example - implement memoize function
 * @param {function} callbackFn - callback function
 *
 * @returns {number} memoizedValue
 *
 */
function myMemoize(callbackFn) {
  const res = {};

  return function (...args) {
    let argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = callbackFn(...args);
    }
    return res[argsCache];
  };
}

const clumsyFunction = (num1, num2) => {
  for (let i = 0; i < 100_000_000; i++) {
    num1++;
  }

  return num1 ** num2;
};

const memoizedFunction = myMemoize(clumsyFunction);

console.time("10");
console.log(memoizedFunction(10, 20));
console.timeEnd("10");
console.time("12");
console.log(memoizedFunction(10, 20));
console.timeEnd("12");
