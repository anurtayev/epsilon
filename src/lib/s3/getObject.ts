import { s3 } from "./s3";

export async function getObject({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) {
  return s3
    .getObject({
      Key: key,
      Bucket: bucket,
    })
    .promise();
}
