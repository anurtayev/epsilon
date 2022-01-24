import { DynamoDBStreamHandler } from "aws-lambda";

import { metaKeeper } from "./metaKeeper";

export const handler: DynamoDBStreamHandler = (event) => {
  console.log(JSON.stringify(event, null, 2));
  metaKeeper(event);
};
