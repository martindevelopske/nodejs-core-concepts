// const fs = require("fs/promises")
//takes 40 seconds to run
// (async () => {
//   const fileHandle = await fs.open("./file.txt", "w");
//   console.time("writemany");

//   for (let i = 0; i < 1000000; i++) {
//     fileHandle.write(`${i} times`);
//   }
//   console.timeEnd("writemany");
// })();

//takes 8 second
//numbers not in order though
// const fs = require("fs");
// (async () => {
//   console.time("writemany");
//   const fileHandle = await fs.open("./file.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(`${i} times`, "utf-8");
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd("writemany");
//   });
// })();
// const fs = require("fs/promises");
// (async () => {
//   console.time("writemany");
//   const fileHandle = await fs.open("./file.txt", "w");
//   console.log(fileHandle);
//   const stream = fileHandle.createWriteStream();
//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(`${i} times`, "utf-8");
//     // await fileHandle.write(buff);
//     // stream.write(buff);
//   }
//   console.timeEnd("writemany");
// })();
const fs = require("fs/promises");
(async () => {
  console.time("writemany");
  const fileHandle = await fs.open("./file.txt", "w");
  // console.log(fileHandle);

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);
  // const buff = Buffer.alloc(16383, "a");
  // const bufff = Buffer.alloc(1, 1);

  // console.log(stream.write(buff));
  // console.log(stream.write(bufff));
  // stream.on("drain", () => {
  //   console.log("ready for more....");
  //   console.log(stream.writableLength);
  // });
  // console.log(stream.writableLength);
  let i = 0;
  const writemany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(`${i} times`, "utf-8");
      //this is the last write

      if (i === 999999) {
        console.log("done....");
        return stream.end(buff);
      }
      if (!stream.write(buff)) {
        break;
      }
      stream.write(buff);
      i++;
    }
  };
  writemany();
  ///resume loop once buffer is drained
  let drainCount = 0;
  stream.on("drain", () => {
    drainCount++;
    writemany();
  });
  stream.on("finish", () => {
    console.timeEnd("writemany");
    console.log(drainCount, "draincount");
    fileHandle.close();
  });
})();
