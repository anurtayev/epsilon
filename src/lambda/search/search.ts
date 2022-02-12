import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { documentClient } from "../../lib/awsClients";
import { QuerySearchArgs, FolderConnection } from "../../lib/graphqlTypes";
import mergeSearchArrays from "./mergeSearchArrays";
import { ArrayOfEntries, Attributes } from "./types";

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

  let foundEntries: ArrayOfEntries;

  // get all attributes-files relationships
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
    foundEntries = mergeSearchArrays(items, foundEntries);
  }

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
    foundEntries = mergeSearchArrays(items, foundEntries);
  }

  // get attributes metadata
  const responses: Attributes = (
    await Promise.all(
      foundEntries.map(({ id }) =>
        documentClient
          .query({
            TableName: process.env.META_TABLE,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
              ":id": id,
            },
            Select: "ALL_ATTRIBUTES",
          })
          .promise()
      )
    )
  ).map(({ Items: items }) => items[0].attributes);

  // sort and skip to nextToken
  // trim to pageSize

  return {
    items: foundEntries.map(({ id }) => ({ id })),
  };
};
