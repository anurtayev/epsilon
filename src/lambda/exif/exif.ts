import { log } from "console";
import { getObject } from "../../lib/s3";

import { extractDateInformationFromFolderName } from "./dateFromFolderName";
import { exifrExtract } from "./exifrExtract";

export const handler = async (event) => {
  log("new event:", JSON.stringify(event, null, 2));

  const {
    s3: {
      object: { key },
      bucket: { name: bucket },
    },
  } = event.Records[0];
  log("key:", key, "bucket:", bucket);

  let exif: object;

  try {
    const buf = (await getObject({ bucket, key })).Body;
    exif = await exifrExtract(buf);
  } catch (error) {
    //
  }

  if (exif) log("exif from file:", exif);
  else {
    exif = await extractDateInformationFromFolderName(key);
    log("date information from folder:", exif);
  }

  return { statusCode: 200 };
};
