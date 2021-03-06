import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "../../lib/awsClients";

/**
 * Put all attributesValuesFilesRelationships into
 * AttributesValuesFilesRelationships table if they do not exist.
 */
export default ({
  id,
  attributes = [],
}: Pick<ExtractedMetaArray[number], "id" | "attributes">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] =>
  attributes.map(({ name: attribute, value }) =>
    documentClient
      .put({
        Item: { attribute, id, attributeValue: `${attribute}#${value}` },
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
      })
      .promise()
  );
