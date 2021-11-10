const documentClient = require("./dynamodb");

module.exports = {
  batchWrite,
};

async function batchWrite(items) {
  return documentClient
    .batchWrite({
      RequestItems: {
        [process.env.DD_TABLE_NAME]: items.map((item) => ({
          PutRequest: { Item: item },
        })),
      },
    })
    .promise();
}
