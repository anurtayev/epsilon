require("dotenv-safe").config();

const { Stats, statSync } = require("fs");
const { relative, basename, extname } = require("path");
const { metaFile, fsPath } = require("path");
const { readJson } = require("fs-extra");
const klaw = require("klaw");

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "epsilon-starter",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const repositoryPath = process.env.REPOSITORY_PATH;
const metaTopic = process.env.META_TOPIC;

const run = async () => {
  await producer.connect();

  for await (const { path } of klaw(repositoryPath)) {
    const ext = extname(path);
    const relativePath = relative(repositoryPath, path);

    if (ext === ".json" && relativePath.includes(".metaFolder")) {
      const key = relativePath.replace(/(\.metaFolder\/|\.json$)/g, "");
      const meta = JSON.stringify(await readJson(path));

      const msg = { key, value: meta };
      console.log("==> msg", msg);

      await producer.send({
        topic: metaTopic,
        messages: [msg],
      });
    }
  }

  await producer.disconnect();
};

run().catch(console.error);
