function greet() {
  console.log("Hello", this.name, "good", this.wish);
}

const greetObj = {
  name: "Dora",
  wish: "day!",
};

greet.call(greetObj);

const num = [1, 2, 3, 4];
const arr = [5, 6, 7, 8];

arr.push.apply(arr, num);
console.log(arr);

const cityInfo = {
  name: "Delhi",
  river: "Yamuna",
  tier: 1,
};

function getCityInfo(message) {
  return `${message} ${this.name}. This is a tier ${this.tier} city. The main river is ${this.river}.`;
}

const cityBind = getCityInfo.bind(cityInfo);
console.log(cityBind("Welcome to"));
const res = getCityInfo.call(cityInfo, "This is");
console.log("Using Call:", res);

// call polyfill
const character = {
  name: "Michael",
  role: "Regional Manager",
};

function characterInfo(age) {
  return `This is ${this.name}, I am ${this.role}, and aboud ${age} years old`;
}

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") return;

  context.newFunction = this;
  const res = context.newFunction(...args);
  delete context.newFunction;
  return res;
};

const charRes = characterInfo.myCall(character, 40);
console.log(charRes);

// apply
Function.prototype.myFilter = function (context, args) {
  if (!Array.isArray(args) || typeof this !== "function") return;

  context.newFunction = this;
  return context.newFunction(...args);
};

const charResApply = characterInfo.myCall(character, [40]);
console.log(charResApply);

// bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") return;

  context.newFunction = this;
  return function (...args) {
    return context.newFunction(...args);
  };
};

const myBindCharacter = characterInfo.myBind(character);
console.log(myBindCharacter(20));
