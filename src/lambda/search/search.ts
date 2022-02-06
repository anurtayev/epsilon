import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { documentClient } from "../../lib/awsClients";
import { QuerySearchArgs, FolderConnection } from "../../lib/graphqlTypes";

export const handler: AppSyncResolverHandler<
  QuerySearchArgs,
  FolderConnection
> = async ({
  arguments: {
    searchInput: { attributesSorter, attributesFilter, tagsFilter },
    nextToken,
    pageSize,
  },
}) => {
  info({ attributesSorter, attributesFilter, tagsFilter, nextToken, pageSize });

  let result: FolderConnection;
  let arr;

  // get all tags-files relationships
  for (const tag of tagsFilter) {
    const { Items: items } = await documentClient
      .query({
        TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
        KeyConditionExpression: "tag = :tag",
        ExpressionAttributeValues: {
          ":tag": tag,
        },
        Select: "ALL_ATTRIBUTES",
      })
      .promise();

    if (!arr) {
      arr = items;
      console.log("==> arr", arr);
    }
  }

  // get all attributes-files relationships

  // sort and skip to nextToken

  // trim to pageSize

  return result;
};
