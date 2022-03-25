import { ExtractedMeta } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Deletes attribute-file relationship and if it is not related to
 * other files deletes attribute from Attributes table.
 *
 * Attribute is related to other files if total more than one
 * relationship exists.
 */
export default ({
  id,
  deletedAttributes = [],
}: Pick<ExtractedMeta, "id" | "deletedAttributes">) =>
  deletedAttributes.map(async ({ attribute: { name: attribute }, value }) => {
    // check if more than one relationship exists
    // then attribute is related to other files
    const checkResult = await documentClient
      .query({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        IndexName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE_INDEX,
        KeyConditionExpression: "#a = :attribute",
        ExpressionAttributeValues: {
          ":attribute": attribute,
        },
        ExpressionAttributeNames: {
          "#a": "attribute",
        },
        Limit: 2,
        Select: "COUNT",
      })
      .promise();

    if (checkResult.Count === 1) {
      // if it is not, delete it from Attributes table
      await documentClient
        .delete({
          TableName: process.env.ATTRIBUTES_TABLE,
          Key: {
            attribute,
          },
        })
        .promise();
    }

    // delete attribute-file relationship
    await documentClient
      .delete({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        Key: {
          attributeValue: `${attribute}#${value}`,
          id,
        },
      })
      .promise();
  });
