function sum(num1) {
    return function (num2) {
        return num1 + num2;
    };
}
var resSum = sum(1)(2);
console.log(resSum);
