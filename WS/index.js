const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;
const server = http.createServer((req, res) => {
  console.log("we have recieved a request");
});

const webSocket = new WebSocketServer({
  httpServer: server,
});
webSocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", (e) => console.log("openedd....."));
  connection.on("close", (e) => console.log("closedd....."));
  connection.on("message", (message) => {
    console.log("message recieved", message.utf8Data);
  });
  send5sec();
});
server.listen(8082, () => console.log("my server is listening on port 8082"));
function send5sec() {
  connection.send(`Message ${Math.random()}`);
  setTimeout(send5sec, 3000);
}
