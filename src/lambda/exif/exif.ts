import { error, info } from "console";
import { EventBridgeHandler } from "aws-lambda";

import { isKeyExtensionAllowed, getExtension } from "../../lib/util";
import { s3, documentClient } from "../../lib/awsClients";

import { extractDateInformationFromFolderName } from "./dateFromFolderName";
import { exifrExtract } from "./exifrExtract";

const cleanseAndPutIntoArray = (exifData: object = {}) =>
  Reflect.ownKeys(exifData)
    .map((key) => [key, exifData[key]])
    .filter((e) => e.every(Boolean));

export const handler: EventBridgeHandler<"Object Created", any, void> = async (
  event
) => {
  info(JSON.stringify(event, null, 2));

  const {
    detail: {
      object: { key },
      bucket: { name: bucket },
    },
  } = event;
  info("key:", key, "bucket:", bucket);

  if (!isKeyExtensionAllowed(getExtension(key))) return;

  let exif: object;

  try {
    const buf = (await s3.getObject({ Bucket: bucket, Key: key }).promise())
      .Body;
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
    await documentClient.put({ Item: meta, TableName: process.env.META_TABLE });
    info("created meta data entry:", JSON.stringify(meta, null, 2));
  }
};
