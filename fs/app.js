const fs = require("fs/promises");

(async () => {
  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const UPDATE_FILE = "update a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to a file";

  //functions
  const createFile = async (path) => {
    let existingFileHandle;
    try {
      //check file
      existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      return console.log("The file path already exists");
    } catch (err) {
      //no file-create it
      const newFileHandle = await fs.open(path, "w");
      console.log("new file was successfully created");
      newFileHandle.close();
    } finally {
    }
  };
  const deleteFile = async (path) => {
    try {
      const fileExists = await fs.open(path, "r");
      await fs.unlink(path);
      console.log("file deleted successfully");
    } catch (err) {
      console.log("file does not exist");
    }
  };
  const renameFile = async (oldpath, newpath) => {
    try {
      const fileExists = await fs.open(oldpath, "r");
      await fs.rename(oldpath, newpath);
      console.log("file renamed successfully");
    } catch (err) {
      console.log(err.message);
    }
  };
  const addToFile = async (path, content) => {
    try {
      const fileExists = await fs.open(path, "r");
      await fs.appendFile(content.toString());
      fileExists.close();
    } catch (err) {
      console.log(err.message);
    }
  };
  // open file
  const commandFileHandler = await fs.open("./command.txt", "r"); //saving  a represantational number to your memory

  commandFileHandler.on("change", async () => {
    console.log("The file was changed");

    //read file content
    //1.open
    //2. read or write to that file

    //get file size and allocate it as the buffer

    const size = await (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = size;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);
    //decode content
    const command = buff.toString("utf-8");
    console.log(command);
    //create file
    //create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
    //delete a file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }
    if (command.includes(RENAME_FILE)) {
      const indx = command.indexOf(" to ");
      console.log(indx);
      const filePath = command.substring(RENAME_FILE.length + 1, indx);
      console.log(filePath, "old");
      const newPath = command.substring(indx + 4);
      console.log(newPath, "new");
      renameFile(filePath, newPath);
    }
    if (command.includes(ADD_TO_FILE)) {
      const indx = command.indexOf(" this content: ");
      console.log(indx);
      const filePath = command.substring(ADD_TO_FILE.length + 1, indx);
      const content = command.substring(indx + 15);
      console.log(content);
      addToFile(filePath, content);
    }
  });
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
