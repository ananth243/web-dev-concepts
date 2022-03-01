const { createReadStream, createWriteStream } = require("fs");
const { join } = require("path");

//Read file contents
const readStream = createReadStream(join(__dirname, "stream.txt"), {
  encoding: "utf-8",
});
const writeStream = createWriteStream(join(__dirname, "stream-copy.txt"));
readStream.on("data", (res) => {
  console.log(res.toString()); // Res will be of Buffer type: https://nodejs.org/api/buffer.html#buffer
  writeStream.write(res);
});

readStream.on("end", () => {
  console.log("Stream ended");
  writeStream.end("Ended write stream");
});
