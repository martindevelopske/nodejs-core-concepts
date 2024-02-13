const fs = require("fs/promises");
(async () => {
  const fileHandle = await fs.open("file.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");
  const stream = fileHandle.createReadStream();
  const streadWrite = fileHandleWrite.createWriteStream();

  stream.on("data", (chunk) => {
    if (!streadWrite.write(chunk)) {
      stream.pause();
    }
  });
  streadWrite.on("drain", () => {
    stream.resume();
  });
  stream.on("end", () => console.log("done__________"));
})();
