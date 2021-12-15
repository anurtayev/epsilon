import { Transform } from "stream";
import { getObject } from "@lib/s3";

const META_FOLDER_NAME = ".metaFolder";

export const extractMetaTransform = new Transform({
  objectMode: true,
  // @ts-ignore
  async transform({ id }, encoding, callback) {
    let meta;
    try {
      meta = JSON.parse(
        (await getObject(getMetaFilePath(id))).Body.toString("utf-8")
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

function getMetaFilePath(id: string) {
  const idParts = id.split("/");
  return (
    idParts.slice(0, -1).join("/") +
    "/" +
    META_FOLDER_NAME +
    "/" +
    idParts.slice(-1)[0] +
    ".json"
  );
}
