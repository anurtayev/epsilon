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

  // get all tags-files relationships
  const checkResult = await documentClient
    .query({
      TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
      KeyConditionExpression: "tag = :tag",
      ExpressionAttributeValues: {
        ":tag": name,
      },
      Select: "ALL_ATTRIBUTES",
    })
    .promise();

  // get all attributes-files relationships

  // sort and skip to nextToken

  // trim to pageSize

  return result;
};
