import { error, info } from "console";
import { getObject } from "../../lib/s3";
import { put } from "../../lib/dynamodb";

import { extractDateInformationFromFolderName } from "./dateFromFolderName";
import { exifrExtract } from "./exifrExtract";

export const handler = async (event) => {
  info(JSON.stringify(event, null, 2));

  const {
    detail: {
      object: { key },
      bucket: { name: bucket },
    },
  } = event;
  info("key:", key, "bucket:", bucket);

  let exif: object;

  try {
    const buf = (await getObject({ bucket, key })).Body;
    exif = await exifrExtract(buf);
    exif && info("exif source: file");
  } catch (e) {
    error(e);
  }

  if (!exif) {
    exif = await extractDateInformationFromFolderName(key);
    exif && info("exif source: folder name");
  }

  info("exif:", exif);
  await put({ id: key, attributes: exif });
  info("success");
};
