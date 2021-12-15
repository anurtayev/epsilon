import { Transform } from "stream";
import { getObject } from "@lib/s3";

import { extractDateInformationFromFolderName } from "./dateFromFolderName";
import { exifrExtract } from "./exifrExtract";

export const extractExifTransform = new Transform({
  objectMode: true,

  // @ts-ignore
  async transform(metaInfo, encoding, callback) {
    const { id } = metaInfo;
    let exif;

    try {
      const buf = (await getObject(id)).Body;
      exif = await exifrExtract(buf);
    } catch (error) {
      //
    }

    if (!exif) {
      exif = await extractDateInformationFromFolderName(id);
    }

    return exif;
  },
});
