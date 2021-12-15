import { pipeline as pipelineWithCallback, Writable } from "stream";
import { promisify } from "util";

import { s3KeysReadable } from "@lib/s3";
import { extractMetaTransform } from "@lib/meta";
import { extractExifTransform } from "@lib/exif";

const pipeline = promisify(pipelineWithCallback);

const run = async () => {
  try {
    await pipeline(
      s3KeysReadable,

      extractMetaTransform,

      extractExifTransform,

      new Writable({
        // @ts-ignore
        write(mediaFileMeta, encoding, callback) {
          mediaFileMeta.meta &&
            console.log(JSON.stringify(mediaFileMeta, null, 2));
          callback();
        },
        objectMode: true,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};

run();
