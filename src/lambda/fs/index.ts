import { error, info } from "console";
import { ListObjectsV2Output } from "aws-sdk/clients/s3";

import { listObjectsV2 } from "../../lib/s3";

const inputBucket = "epsilon-development-media";
const folder = "108APPLE/";

const run = async () => {
  let isReadingFinished = false;
  let res: ListObjectsV2Output;

  while (!isReadingFinished) {
    res = await listObjectsV2({
      bucket: inputBucket,
      continuationToken: res ? res.NextContinuationToken : undefined,
      folder,
    });

    res.Contents.forEach(function (element) {
      info("==> ", element.Key);
    });

    res.CommonPrefixes.forEach(function (element) {
      info("=>> ", element.Prefix);
    });

    isReadingFinished = !res.IsTruncated;
  }
};

run().catch(error);
