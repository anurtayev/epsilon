import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { isKeyExtensionAllowed, getExtension } from "../../lib/util";
import { s3, S3_MAX_KEYS } from "../../lib/awsClients";
import { QueryListFolderArgs, FolderConnection } from "../../lib/graphqlTypes";

export const handler: AppSyncResolverHandler<
  QueryListFolderArgs,
  FolderConnection
> = async ({ arguments: { id, nextToken, pageSize } }) => {
  info(JSON.stringify({ id, nextToken }, null, 2));

  const res = await s3
    .listObjectsV2({
      Bucket: process.env.MEDIA_BUCKET,
      MaxKeys: S3_MAX_KEYS,
      Delimiter: "/",
      ...(nextToken ? { ContinuationToken: nextToken } : {}),
      ...(id ? { Prefix: id } : {}),
      ...(pageSize ? { MaxKeys: pageSize } : {}),
    })
    .promise();

  info(JSON.stringify(res, null, 2));

  return {
    items: [
      ...res.Contents.filter(({ Key: id }) =>
        isKeyExtensionAllowed(getExtension(id))
      ).map(({ Key: id }) => ({
        id,
        __typename: "Entry",
      })),
      ...res.CommonPrefixes.map(({ Prefix: id }) => ({
        id,
        __typename: "Entry",
      })),
    ],
    nextToken: res.NextContinuationToken,
  };
};
