import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { isKeyExtensionAllowed, getExtension } from "../../lib/util";
import { s3, S3_MAX_KEYS } from "../../lib/awsClients";
import { QueryListFolderArgs, FolderConnection } from "../../lib/graphqlTypes";

export const handler: AppSyncResolverHandler<
  QueryListFolderArgs,
  FolderConnection
> = async ({ arguments: { id, nextToken } }) => {
  info(JSON.stringify({ id, nextToken }, null, 2));

  const res = await s3
    .listObjectsV2({
      Bucket: process.env.MEDIA_BUCKET,
      MaxKeys: S3_MAX_KEYS,
      Delimiter: "/",
      ...(nextToken ? { ContinuationToken: nextToken } : {}),
      ...(id ? { Prefix: id } : {}),
    })
    .promise();

  info(JSON.stringify(res, null, 2));

  return {
    items: [
      ...res.Contents.map((element) => ({
        id: element.Key,
        size: element.Size,
        extension: getExtension(element.Key),
        __typename: "FileEntry",
      })).filter(({ id }) => isKeyExtensionAllowed(getExtension(id))),
      ...res.CommonPrefixes.map((element) => ({
        id: element.Prefix,
        __typename: "FolderEntry",
      })),
    ],
    nextToken: res.NextContinuationToken,
  };
};
