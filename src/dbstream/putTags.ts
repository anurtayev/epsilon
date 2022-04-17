import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Add all tags to the Tags table if they do not exists.
 */
export default (
  tags: ExtractedMetaArray[number]["tags"] = []
): Promise<PromiseResult<PutItemOutput, AWSError>>[] => {
  console.log("==> putTags", tags);

  return tags.map(async (tag) => {
    let result;
    try {
      result = await documentClient
        .put({ Item: { tag }, TableName: process.env.TAGS_TABLE })
        .promise();
    } catch (error) {
      console.error("==> putTags", error);
    }
    return result;
  });
};
