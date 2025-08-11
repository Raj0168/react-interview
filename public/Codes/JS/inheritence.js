class Shape {
  constructor(color) {
    this.color = color;
  }

  getColor() {
    return `The color is ${this.color}.`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  describe() {
    return `This is a circle with a radius of ${this.radius} and a color of ${this.color}.`;
  }
}

const myCircle = new Circle("red", 10);

console.log(myCircle.getColor());
console.log(myCircle.getArea());
console.log(myCircle.describe());
