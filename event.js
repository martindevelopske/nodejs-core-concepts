const eventEmmitter = require("events");

class Emitter extends eventEmmitter {}
const myE = new Emitter();
myE.on("foo", ()=>{
    console.log("event occured");
})
myE.emit("foo")
const target = new EventTarget();

target.addEventListener('foo', (event) => {
  console.log('foo event happened!');
});