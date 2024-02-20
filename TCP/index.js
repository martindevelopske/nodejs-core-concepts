// const net = require("net");
// const server = net.createServer((socket) => {
//   socket.write("hello");
//   socket.on("data", (data) => {
//     console.log(data.toString());
//   });
// });

// server.listen(8081);
// //connect using telnet on the terminal

//UDP
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
socket.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}`);
});
socket.bind(8082);
