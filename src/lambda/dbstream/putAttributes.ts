import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "../../lib/awsClients";

/**
 * Put all attributes into Attributes table if they do not exist.
 */
export default (
  attributes: ExtractedMetaArray[number]["attributes"] = []
): Promise<PromiseResult<PutItemOutput, AWSError>>[] =>
  attributes.map(({ name: attribute }) =>
    documentClient
      .put({
        Item: { attribute },
        TableName: process.env.ATTRIBUTES_TABLE,
      })
      .promise()
  );
