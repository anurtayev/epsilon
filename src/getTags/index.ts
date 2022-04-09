import { AppSyncResolverHandler } from "aws-lambda";
import { dynamoTableRipper } from "@aspan/sigma";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handler: AppSyncResolverHandler<
  unknown,
  Array<string>
> = async () =>
  await dynamoTableRipper<string>({
    tableName: process.env.TAGS_TABLE,
    processorFn: (items: DocumentClient.Key) =>
      items.map(({ tag }: { tag: string }) => tag),
  });
