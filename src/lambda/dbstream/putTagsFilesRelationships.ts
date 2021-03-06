import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "../../lib/awsClients";

/**
 * Put all tagsFilesRelationships inot TagsFilesRelationships table
 * if they do not exist.
 */
export default ({
  id,
  tags = [],
}: Pick<ExtractedMetaArray[number], "id" | "tags">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] =>
  tags.map((tag) =>
    documentClient
      .put({
        Item: { tag, id },
        TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
      })
      .promise()
  );
