const fs = require("fs/promises");
(async () => {
  console.time("copy");
  const srcFile = await fs.open("../readmany/dest.txt", "r");
  const destFile = await fs.open("copied.txt", "w");

  let bytesRead = -1;
  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    bytesRead = readResult.bytesRead;

    destFile.write(readResult.buffer);
  }
  console.timeEnd("copy");
})();
