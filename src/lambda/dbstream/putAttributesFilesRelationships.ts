import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMeta } from "./extractMeta";
import { put } from "../../lib/dynamodb";

/**
 * Put all attributesValuesFilesRelationships into
 * AttributesValuesFilesRelationships table if they do not exist.
 */
export default ({
  id,
  attributes,
}: Pick<ExtractedMeta[number], "id" | "attributes">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] =>
  attributes.map(({ name: attribute, value }) =>
    put({
      payloadJson: { attribute, id, attributeValue: `${attribute}#${value}` },
      table: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
    })
  );
