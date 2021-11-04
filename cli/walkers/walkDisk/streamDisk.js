const CMD_NAME = "streamDisk";
const { Command } = require("commander");
const cmd = new Command(CMD_NAME);
module.exports = cmd;

const { isExtensionSupported, processItem } = require("../../util");
const klaw = require("klaw");
const { pipeline } = require("stream/promises");
const { Transform, Writable } = require("stream");
const { batchWrite } = require("../../services/dynamodb");

const repositoryPath = process.env.REPOSITORY_PATH;
const MAX_BUFFER_SIZE = 25;

cmd.action(async () => {
  await pipeline(
    klaw(repositoryPath),
    new Transform({
      objectMode: true,
      async transform({ stats, path }, encoding, callback) {
        !stats.isDirectory() && isExtensionSupported(path)
          ? callback(null, await processItem(path))
          : callback();
      },
    }),
    new Writable({
      objectMode: true,
      construct(callback) {
        this.buffer = [];
        callback();
      },
      write(chunk, encoding, callback) {
        this.buffer.push(chunk);

        console.log(chunk);

        if (this.buffer.length === MAX_BUFFER_SIZE) {
          batchWrite(this.buffer);
          this.buffer = [];
        }
        callback();
      },
    })
  );
});
