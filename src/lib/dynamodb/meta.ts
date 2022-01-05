import { Transform } from "stream";
import { getObject } from "../s3";

export const extractMetaTransform = new Transform({
  objectMode: true,
  // @ts-ignore
  async transform({ id }, encoding, callback) {
    let meta;
    try {
      meta = JSON.parse(
        (
          await getObject({ key: id, bucket: process.env.MEDIA_S3_BUCKET })
        ).Body.toString("utf-8")
      );
    } catch (error) {
      //
    }

    this.push({
      id,
      tags: meta && meta.tags,
      attributes:
        meta &&
        meta.attributes &&
        meta.attributes.reduce((acc: object, cur: Array<string>) => {
          acc[cur[0]] = cur[1];
          return acc;
        }, {}),
    });
    callback();
  },
});
