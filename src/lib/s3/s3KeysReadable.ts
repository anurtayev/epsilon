import { ListObjectsV2Output } from "aws-sdk/clients/s3";
import { Readable } from "stream";
import { extname } from "path";

import { s3 } from "./s3";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg"];

function isExtensionSupported(id: string) {
  const ext = extname(id).slice(1).toLowerCase(); // remove dot
  return ALLOWED_EXTENSIONS.includes(ext);
}

export const s3KeysReadable = new Readable({
  async read() {
    let isReadingFinished = false;
    let res: ListObjectsV2Output;

    while (!isReadingFinished) {
      res = await s3
        .listObjectsV2({
          Bucket: process.env.MEDIA_S3_BUCKET,
          MaxKeys: 100,
          ...(res ? { ContinuationToken: res.NextContinuationToken } : {}),
        })
        .promise();

      res.Contents.map(({ Key: id }) => {
        isExtensionSupported(id) && this.push({ id });
      });

      isReadingFinished = !res.IsTruncated;
    }

    this.push(null);
  },
  objectMode: true,
});
