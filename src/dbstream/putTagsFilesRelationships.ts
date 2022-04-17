import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Put all tagsFilesRelationships inot TagsFilesRelationships table
 * if they do not exist.
 */
export default ({
  id,
  tags = [],
}: Pick<ExtractedMetaArray[number], "id" | "tags">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] => {
  console.log("==> putTagsFilesRelationships", id, tags);

  return tags.map(async (tag) => {
    let result;
    try {
      result = await documentClient
        .put({
          Item: { tag, id },
          TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
        })
        .promise();
    } catch (error) {
      console.error("==> putTagsFilesRelationships", error);
    }

    return result;
  });
};
