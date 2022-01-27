import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMeta } from "./extractMeta";
import { put } from "../../lib/dynamodb";

/**
 * Put all tagsFilesRelationships inot TagsFilesRelationships table
 * if they do not exist.
 */
export default ({
  id,
  tags,
}: Pick<ExtractedMeta[number], "id" | "tags">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] =>
  tags.map((tag) =>
    put({
      payloadJson: { tag, id },
      table: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
    })
  );
