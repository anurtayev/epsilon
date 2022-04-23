import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";
import isFolder from "./isFolder";
import {
  documentClient,
  QuerySearchArgs,
  FolderConnection,
} from "@aspan/sigma";
import mergeSearchArrays from "./mergeSearchArrays";
import findTokenIndex from "./findTokenIndex";
import { Entries, EntriesWithAttributes, TokenSearchResult } from "./types";
import sort, { stripper } from "./sort";

export const handler: AppSyncResolverHandler<
  QuerySearchArgs,
  FolderConnection
> = async ({
  arguments: {
    searchInput: {
      filter: { tags: tagsFilter, attributes: attributesFilter },
      sorter: attributesSorter,
    },
    nextToken,
    pageSize,
  },
}) => {
  info(
    JSON.stringify(
      {
        attributesSorter,
        attributesFilter,
        tagsFilter,
        nextToken,
        pageSize,
      },
      null,
      2
    )
  );

  let foundEntries: Entries;

  // get all attributes-files relationships
  if (attributesFilter) {
    for (const {
      attribute: { name: attribute },
      value,
    } of attributesFilter) {
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
  }

  // get all tags-files relationships
  if (tagsFilter) {
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
  }

  if (!foundEntries) return { items: null, nextToken: null };

  // get attributes metadata
  const responses: EntriesWithAttributes = (
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
  ).map(({ Items: items }) => ({
    id: items[0].id,
    attributes: items[0].attributes,
  }));

  // sort and convert from EntriesWithAttributes to Entries
  const sortedEntries: Entries = stripper(
    (attributesSorter?.length && sort(responses, attributesSorter)) || responses
  );

  // calculate next token
  const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
    sortedEntries,
    pageSize,
    nextToken
  );

  // trim to pageSize
  const finalResult = sortedEntries.slice(startingIndex, pageSize);

  return {
    folders: finalResult.filter(({ id }) => isFolder(id)),
    files: finalResult.filter(({ id }) => !isFolder(id)),
    nextToken: newNextToken,
  };
};
