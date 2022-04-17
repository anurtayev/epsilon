import { PromiseResult } from "aws-sdk/lib/request";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { AWSError } from "aws-sdk/lib/error";

import { ExtractedMeta } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Put all attributesValuesFilesRelationships into
 * AttributesValuesFilesRelationships table if they do not exist.
 */
export default ({
  id,
  attributes = [],
}: Pick<ExtractedMeta, "id" | "attributes">): Promise<
  PromiseResult<PutItemOutput, AWSError>
>[] => {
  console.log("==> putAttributesFilesRelationships", id, attributes);

  return attributes.map(async ({ attribute: { name: attribute }, value }) => {
    let result;
    try {
      result = await documentClient
        .put({
          Item: {
            attribute,
            id,
            attributeValue: `${attribute}#${value}`,
          },
          TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        })
        .promise();
    } catch (error) {
      console.error("==> putAttributesFilesRelationships", error);
    }
    return result;
  });
};
