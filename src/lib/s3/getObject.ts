import { s3 } from "./s3";

export async function getObject(id: string) {
  return s3
    .getObject({
      Key: id,
      Bucket: process.env.MEDIA_S3_BUCKET,
    })
    .promise();
}
