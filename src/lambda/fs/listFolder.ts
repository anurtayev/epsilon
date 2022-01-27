import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { isKeyExtensionAllowed, getExtension } from "../../lib/util";
import { listObjectsV2 } from "../../lib/s3";
import { QueryListFolderArgs, FolderConnection } from "../../lib/graphqlTypes";

export const handler: AppSyncResolverHandler<
  QueryListFolderArgs,
  FolderConnection
> = async ({ arguments: { id, nextToken } }) => {
  info(JSON.stringify({ id, nextToken }, null, 2));

  const res = await listObjectsV2({
    bucket: process.env.MEDIA_BUCKET,
    continuationToken: nextToken,
    folder: id,
  });

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
