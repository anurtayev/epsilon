import { info } from "console";
import { AppSyncResolverHandler } from "aws-lambda";

import { isKeyExtensionAllowed } from "../../lib/util";
import { listObjectsV2 } from "../../lib/s3";
import { QueryListFolderArgs, EntryConnection } from "../../lib/graphqlTypes";

export const handler: AppSyncResolverHandler<
  QueryListFolderArgs,
  EntryConnection
> = async ({ arguments: { id, nextToken } }) => {
  info(JSON.stringify({ id, nextToken }, null, 2));

  let res = await listObjectsV2({
    bucket: process.env.MEDIA_BUCKET,
    continuationToken: nextToken,
    folder: id,
  });

  info(JSON.stringify(res, null, 2));

  return {
    items: res.Contents.map((element) => ({ id: element.Key }))
      .filter(({ id }) => isKeyExtensionAllowed(id))
      .concat(res.CommonPrefixes.map((element) => ({ id: element.Prefix }))),
    nextToken: res.NextContinuationToken,
  };
};
