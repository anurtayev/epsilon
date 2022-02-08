import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

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

  let arr: DocumentClient.ItemList;

  // get all tags-files relationships
  for (const [attribute, value] of attributesFilter) {
    const { Items: items } = await documentClient
      .query({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        KeyConditionExpression: "attributeValue = :attributeValue",
        ExpressionAttributeValues: {
          ":attributeValue": `${attribute}#${value}`,
        },
        Select: "ALL_ATTRIBUTES",
      })
      .promise();

    arr = items;
  }

  // get all attributes-files relationships

  // sort and skip to nextToken

  // trim to pageSize

  console.log("==> ", arr);

  return {
    __typename: "FolderConnection",
    items: arr.map(({ id }) => ({ __typename: "Entry", id })),
  };
};
