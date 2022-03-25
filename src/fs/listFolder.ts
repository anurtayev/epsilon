import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import {
  QueryListFolderArgs,
  FolderConnection,
  isKeyExtensionAllowed,
  getExtension,
  s3,
  S3_MAX_KEYS,
} from "@aspan/sigma";

export const handler: AppSyncResolverHandler<
  QueryListFolderArgs,
  FolderConnection
> = async ({ arguments: { id, nextToken, pageSize } }) => {
  info({ id, nextToken, pageSize });

  const res = await s3
    .listObjectsV2({
      Bucket: process.env.MEDIA_BUCKET,
      Delimiter: "/",
      MaxKeys: pageSize || S3_MAX_KEYS,
      ...(nextToken ? { ContinuationToken: nextToken } : {}),
      ...(id ? { Prefix: id } : {}),
    })
    .promise();

  info(res);

  return {
    items: [
      ...res.Contents.filter(({ Key: id }) =>
        isKeyExtensionAllowed(getExtension(id))
      ).map(({ Key: id }) => ({ id })),
      ...res.CommonPrefixes.map(({ Prefix: id }) => ({
        id,
      })),
    ],
    nextToken: res.NextContinuationToken,
  };
};
