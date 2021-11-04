const documentClient = require("./dynamodb");

const tableName = process.env.DD_TABLE_NAME;

module.exports = async function (items) {
  return documentClient
    .batchWrite({
      RequestItems: {
        [tableName]: items.map((item) => ({ PutRequest: { Item: item } })),
      },
    })
    .promise();
};
