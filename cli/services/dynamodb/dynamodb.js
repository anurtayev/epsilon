const DynamoDB = require("aws-sdk/clients/dynamodb");
module.exports = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
