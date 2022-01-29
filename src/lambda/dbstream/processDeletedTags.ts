import { ExtractedMeta } from "./extractMeta";
import { documentClient } from "../../lib/awsClients";

/**
 * Deletes tag-file relationship and if tag is not related to
 * other files deletes it from Tags table.
 */
export default ({
  id,
  deletedTags = [],
}: Pick<ExtractedMeta[number], "id" | "deletedTags">) =>
  deletedTags.map(async (tag) => {
    // check if it is related to other files
    const checkResult = await documentClient
      .query({
        TableName: process.env.TAGS_TABLE,
        KeyConditionExpression: "tag = :tag",
        ExpressionAttributeValues: {
          ":tag": { S: tag },
        },
        Limit: 2,
        Select: "COUNT",
      })
      .promise();

    if (checkResult.Count === 1) {
      // if it is not, delete it from Tags table
      await documentClient
        .delete({
          TableName: process.env.TAGS_TABLE,
          Key: {
            tag,
          },
        })
        .promise();
    }

    // delete tag-file relationship
    await documentClient
      .delete({
        TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
        Key: {
          tag,
          id,
        },
      })
      .promise();
  });
