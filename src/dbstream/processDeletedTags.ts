import { ExtractedMetaArray } from "./extractMeta";
import { documentClient } from "@aspan/sigma";

/**
 * Deletes tag-file relationship and if tag is not related to
 * other files deletes it from Tags table.
 */
export default ({
  id,
  deletedTags = [],
}: Pick<ExtractedMetaArray[number], "id" | "deletedTags">) => {
  console.log("==> processDeletedTags", { id, deletedTags });

  return deletedTags.map(async (tag) => {
    try {
      // check if it is related to other files
      const checkResult = await documentClient
        .query({
          TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
          KeyConditionExpression: "tag = :tag",
          ExpressionAttributeValues: {
            ":tag": tag,
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
    } catch (error) {
      console.error("==> processDeletedTags", error);
    }
  });
};
