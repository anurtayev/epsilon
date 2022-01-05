import { s3 } from "./s3";

const MAX_KEYS = 100;

export async function listObjectsV2({
  bucket,
  continuationToken,
  folder,
}: {
  bucket: string;
  continuationToken: string;
  folder?: string;
}) {
  return s3
    .listObjectsV2({
      Bucket: bucket,
      MaxKeys: MAX_KEYS,
      Delimiter: "/",
      ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
      ...(folder ? { Prefix: folder } : {}),
    })
    .promise();
}
