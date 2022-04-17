import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { Attributes } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Put all attributes into Attributes table if they do not exist.
 */
export default (
  attributes: Attributes = []
): Promise<PromiseResult<PutItemOutput, AWSError>>[] => {
  console.log("==> putAttributes", attributes);

  return attributes.map(async ({ attribute: { name: attribute, type } }) => {
    console.error("==> putAttributes");

    let result;
    try {
      result = await documentClient
        .put({
          Item: { attribute, type },
          TableName: process.env.ATTRIBUTES_TABLE,
        })
        .promise();
    } catch (error) {
      console.error("==> putAttributes", error);
    }

    return result;
  });
};
