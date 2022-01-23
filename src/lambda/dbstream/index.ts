import { DynamoDBStreamHandler } from "aws-lambda";
// import { strict as assert } from "assert";

export const handler: DynamoDBStreamHandler = (event, context) => {
  console.log({ event, context });
};
