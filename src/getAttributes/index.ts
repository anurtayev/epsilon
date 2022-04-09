import { AppSyncResolverHandler } from "aws-lambda";
import { dynamoTableRipper, Attribute } from "@aspan/sigma";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const handler: AppSyncResolverHandler<
  unknown,
  Array<Attribute>
> = async () =>
  await dynamoTableRipper<Attribute>({
    tableName: process.env.ATTRIBUTES_TABLE,
    processorFn: (items: DocumentClient.Key) =>
      items.map(({ attribute, type }: { attribute: string; type: string }) => ({
        name: attribute,
        type,
      })),
  });
