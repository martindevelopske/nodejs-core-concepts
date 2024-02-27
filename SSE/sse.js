const app = require("express")();
app.get("/", (req, res) => {
  res.send("hello from sse");
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

let i = 0;

function send(res) {
  if (res.writableEnded) {
    console.log("writable");
    // If the response has ended, stop sending data
    return;
  }

  res.write("data: " + `notified from stream!!${i++}\n\n`);
  i++;
  setTimeout(() => send(res), 2000);
}

app.listen(9090, () => console.log("server started....."));
