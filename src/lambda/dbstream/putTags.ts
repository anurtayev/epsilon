import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMeta } from "./extractMeta";
import { put } from "../../lib/dynamodb";

/**
 * Add all tags to the Tags table if they do not exists.
 */
export default (
  tags: ExtractedMeta[number]["tags"] = []
): Promise<PromiseResult<PutItemOutput, AWSError>>[] =>
  tags.map((tag) =>
    put({ payloadJson: { tag }, table: process.env.TAGS_TABLE })
  );
