import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMeta } from "./extractMeta";
import { put } from "../../lib/dynamodb";

/**
 * Put all attributes into Attributes table if they do not exist.
 */
export default (
  attributes: ExtractedMeta[number]["attributes"]
): Promise<PromiseResult<PutItemOutput, AWSError>>[] =>
  attributes.map(({ name: attribute }) =>
    put({
      payloadJson: { attribute },
      table: process.env.ATTRIBUTES_TABLE,
    })
  );
