const AWS = require("aws-sdk");
const { Kafka } = require("kafkajs");

s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const kafka = new Kafka({
  clientId: "epsilon-starter",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  let isReadingFinished = false;
  let res;

  await producer.connect();

  while (!isReadingFinished) {
    res = await s3
      .listObjectsV2({
        Bucket: "nurtai-pics-test",
        MaxKeys: 100,
        ...(res ? { ContinuationToken: res.NextContinuationToken } : {}),
      })
      .promise();

    await Promise.all(
      res.Contents.map((element) =>
        producer.send({
          topic: "pics-keys",
          messages: [{ value: JSON.stringify({ key: element.Key }) }],
        })
      )
    );

    isReadingFinished = !res.IsTruncated;
  }
};

run().catch(console.error);
