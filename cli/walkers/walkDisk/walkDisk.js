const CMD_NAME = "walkDisk";
const { Command } = require("commander");
const cmd = new Command(CMD_NAME);
module.exports = cmd;

const { Stats, statSync } = require("fs");
const { relative, basename, extname } = require("path");
const { metaFile, fsPath } = require("path");
const { readJson } = require("fs-extra");
const klaw = require("klaw");
const db = require("../../services/dynamodb");

const repositoryPath = process.env.REPOSITORY_PATH;

cmd.action(async () => {
  for await (const { path } of klaw(repositoryPath)) {
    const ext = extname(path);
    const relativePath = relative(repositoryPath, path);
    console.log("==> rp", relativePath);

    if (ext === ".json" && relativePath.includes(".metaFolder")) {
      const key = relativePath.replace(/(\.metaFolder\/|\.json$)/g, "");
      const meta = JSON.stringify(await readJson(path));

      const msg = { key, value: meta };
      console.log("==> msg", msg);
    }
  }
});
