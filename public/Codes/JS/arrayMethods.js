// Array methods problems

const arr = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (callbackFn) {
  if (typeof callbackFn !== "function") return;

  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callbackFn(this[i], i));
  }

  return res;
};

const resMap = arr.myMap((a, index) => a + index);

console.log("Map: ", resMap);

Array.prototype.myFilter = function (callbackFn) {
  if (typeof callbackFn !== "function") return;

  let res = [];

  for (let i = 0; i < this.length; i++) {
    if (callbackFn(this[i], i)) {
      res.push(this[i]);
    }
  }

  return res;
};

const resFilter = arr.myFilter((a, index) => a > index ** 2);

console.log("Filter: ", resFilter);

Array.prototype.myReduce = function (callbackFn, initValue) {
  if (typeof callbackFn !== "function") return;

  let acc = initValue;

  for (let i = 0; i < this.length; i++) {
    if (acc) {
      acc = callbackFn(acc, this[i], i);
    } else {
      acc = this[i];
    }
  }
  return acc;
};

const resReduce = arr.myReduce((acc, curr) => acc + curr);

console.log("Reduce: ", resReduce);

const multiDimensionArray = [1, [2, 3, [4, 5, [0]], 6], 7, 8];

Array.prototype.myFlat = function (depth) {
  if (depth <= 0) return this;

  let res = [];

  function flatten(arr, currDepth) {
    for (const elem of arr) {
      if (Array.isArray(elem) && currDepth < depth) {
        flatten(elem, currDepth + 1);
      } else {
        res.push(elem);
      }
    }
  }

  flatten(this, 0);
  return res;
};

const resFlat = multiDimensionArray.myFlat(Infinity);

console.log("flat: ", resFlat);

const freqArr = [1, 2, 3, 4, 2, 2];

const resFreq = freqArr.reduce((acc, curr) => {
  acc[curr] = (acc[curr] ?? 0) + 1;
  return acc;
}, {});

console.log("Freq: ", resFreq);

const resReverse = arr.reduce((acc, curr) => [curr, ...acc], []);

console.log("Reverse: ", resReverse);
