require("dotenv-safe").config();

const AWS = require("aws-sdk");
const { Kafka } = require("kafkajs");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const kafka = new Kafka({
  clientId: "epsilon-starter",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const inputBucket = process.env.INPUT_S3_BUCKET;
const keysTopic = process.env.KEYS_TOPIC;

const run = async () => {
  let isReadingFinished = false;
  let res;

  await producer.connect();

  while (!isReadingFinished) {
    res = await s3
      .listObjectsV2({
        Bucket: inputBucket,
        MaxKeys: 100,
        ...(res ? { ContinuationToken: res.NextContinuationToken } : {}),
      })
      .promise();

    const messages = res.Contents.map((element) => ({
      key: element.Key,
      value: element.Key,
    }));

    console.log("==> messages", messages);

    await producer.send({
      topic: keysTopic,
      messages,
    });

    isReadingFinished = !res.IsTruncated;
  }

  await producer.disconnect();
};

run().catch(console.error);
