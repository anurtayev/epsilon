import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "../../lib/awsClients";

/**
 * Deletes attribute-file relationship and if it is not related to
 * other files deletes attribute from Attributes table.
 */
export default ({
  id,
  deletedAttributes = [],
}: Pick<ExtractedMetaArray[number], "id" | "deletedAttributes">) =>
  deletedAttributes.map(async ({ name, value }) => {
    // check if it is related to other files
    const checkResult = await documentClient
      .query({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        IndexName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE_INDEX,
        KeyConditionExpression: "#a = :attribute",
        ExpressionAttributeValues: {
          ":attribute": { S: name },
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
            attribute: name,
          },
        })
        .promise();
    }

    // delete attribute-file relationship
    await documentClient
      .delete({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        Key: {
          attributeValue: `${name}#${value}`,
          id,
        },
      })
      .promise();
  });
