import { documentClient } from "./documentClient";

export const put = async ({
  payloadJson,
  table,
}: {
  payloadJson: object;
  table: string;
}) => documentClient.put({ Item: payloadJson, TableName: table }).promise();
