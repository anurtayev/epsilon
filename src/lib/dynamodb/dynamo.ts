import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamo = new DocumentClient({ apiVersion: "2012-08-10" });

export const put = async (payloadJson: object) =>
  dynamo
    .put({ Item: payloadJson, TableName: process.env.TABLE_NAME })
    .promise();
