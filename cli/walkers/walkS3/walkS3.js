const CMD_NAME = "walkS3";
const { Command } = require("commander");
const cmd = new Command(CMD_NAME);
module.exports = cmd;

const S3 = require("aws-sdk/clients/s3");

const { batchWrite } = require("../../services/dynamodb");
const readAllFiles = require("./readAllFiles");

const s3 = new S3({ apiVersion: "2006-03-01" });
const inputBucket = process.env.INPUT_S3_BUCKET;
const META_FOLDER_NAME = ".metaFolder";

cmd.action(async () => {
  await readAllFiles({ inputBucket, callback: sendToDynamo, s3 });
});

async function sendToDynamo(elements) {
  while (elements.length) {
    const items = await Promise.all(
      elements.splice(0, 25).map(async (id) => {
        const extension = id.split(".").slice(-1)[0].toLowerCase();
        const meta = extractMetaInfo(id);
        return {
          PutRequest: {
            Item: {
              id,
              extension,
              ...(meta || {}),
            },
          },
        };
      })
    );

    console.log(JSON.stringify(items, null, 2));

    // await batchWrite({
    //   RequestItems: {
    //     items,
    //   },
    // });
  }
}

async function extractMetaInfo(id) {
  const idParts = id.split("/");
  const metaDataFilename =
    idParts.slice(0, -1).join("/") +
    "/" +
    META_FOLDER_NAME +
    "/" +
    idParts.slice(-1)[0] +
    ".json";

  let res;
  let meta;
  try {
    res = await s3
      .getObject({
        Bucket: inputBucket,
        Key: metaDataFilename,
      })
      .promise();
    meta = JSON.parse(res.Body.toString());
  } catch (error) {
    // NOOP
  }

  return meta;
}
