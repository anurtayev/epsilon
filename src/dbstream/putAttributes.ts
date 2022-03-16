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
): Promise<PromiseResult<PutItemOutput, AWSError>>[] =>
  attributes.map(({ attribute }) =>
    documentClient
      .put({
        Item: { attribute },
        TableName: process.env.ATTRIBUTES_TABLE,
      })
      .promise()
  );
