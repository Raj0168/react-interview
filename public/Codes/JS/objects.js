const user = {
  name: "prateek",
  age: 24,
  "a b c": "x y z",
};

delete user["a b c"];

for (let key in user) {
  console.log("key: ", key, "; value: ", user[key]);
}

const property = "fName";
const propertyValue = "Alex";

const userName = {
  [property]: propertyValue,
};

console.log(userName["fName"]);

const nums = {
  a: 100,
  b: 200,
  title: "my nums",
};

function parseObjects(nums) {
  for (let key in nums) {
    if (typeof nums[key] === "number") {
      nums[key] *= 2;
    }
  }
}

parseObjects(nums);

const stringParsed = JSON.stringify(nums);
console.log("stringParsed: ", stringParsed);
const jsonParsed = JSON.parse(stringParsed);
console.log("jsonParsed: ", jsonParsed);

const admin = {
  age: 50,
  name: {
    fName: "John",
    lName: "Doe",
  },
};

const {
  age: myAge,
  name: { fName: firstName },
  name: { lName: lastName },
} = admin;

console.log("admin: ", lastName, firstName, myAge);

function changeAgeAndReference(...person) {
  person = {
    name: "Alex",
    age: "18",
  };

  return person;
}

const person1 = {
  name: "Luke",
  age: 20,
};

const person2 = changeAgeAndReference(person1);
console.log(person1);
console.log(person2);

const object = { b: 0, a: 1, c: 3 };

// sort by keys
const sortedObjectKeys = Object.fromEntries(
  Object.entries(object).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
);

console.log("sortedObjectByKeys: ", sortedObjectKeys);

// sort by values
const sortedByValue = Object.fromEntries(
  Object.entries(object).sort(([, valA], [, valB]) => valA - valB)
);

console.log("sortedObjectByValues: ", sortedByValue);

const calculator = {
  res: 0,

  add(num) {
    this.res += num;
    return this;
  },

  multiply(num) {
    this.res *= num;
    return this;
  },

  result() {
    return this.res;
  },
};

const resCalculator = calculator.add(10).multiply(2).add(10).result();
console.log("calc result:", resCalculator);
