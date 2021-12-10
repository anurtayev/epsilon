const CMD_NAME = "streamDisk";
const { Command } = require("commander");
const cmd = new Command(CMD_NAME);
module.exports = cmd;

const { isExtensionSupported, processItem } = require("../../util");
const klaw = require("klaw");
const { pipeline } = require("stream/promises");
const { Transform } = require("stream");
const { dynamodbWritable } = require("../../services/dynamodb");

const repositoryPath = process.env.REPOSITORY_PATH;

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
    dynamodbWritable
  );
});
