const documentClient = require("./dynamodb");

module.exports = async function (params) {
  return documentClient.batchWrite(params).promise();
};
