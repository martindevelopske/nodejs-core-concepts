const obj = {
  name: "martin",
  greet: function () {
    console.log(this);
    return "hi " + this.name;
  },
};

const obj1 = {
  name: "martin",
  greet: () => {
    console.log(this);
    return "hi " + this.name;
  },
};
// console.log(obj1.greet());
const letty = function () {
  console.log(arguments);
};
const j = new letty("a");
letty.prototype.sayHi = () => console.log("hi");
console.log(j.sayHi());
