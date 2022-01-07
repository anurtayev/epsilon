import { error, info } from "console";
import { extname } from "path";

import { getObject } from "../../lib/s3";
import { put } from "../../lib/dynamodb";

import { extractDateInformationFromFolderName } from "./dateFromFolderName";
import { exifrExtract } from "./exifrExtract";

const cleanseAndPutIntoArray = (exifData: object = {}) =>
  Reflect.ownKeys(exifData)
    .map((key) => [key, exifData[key]])
    .filter((e) => e.every(Boolean));

export const handler = async (event) => {
  info(JSON.stringify(event, null, 2));

  const {
    detail: {
      object: { key },
      bucket: { name: bucket },
    },
  } = event;
  info("key:", key, "bucket:", bucket);

  const ext = extname(key).toLowerCase().slice(1);
  if (!process.env.ALLOWED_EXTENSIONS.split("|").includes(ext)) return;

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
  if (exif) {
    const meta = { id: key, attributes: cleanseAndPutIntoArray(exif) };
    await put(meta);
    info("created meta data entry:", JSON.stringify(meta, null, 2));
  }
};
