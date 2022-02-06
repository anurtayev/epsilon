import { error, info } from "console";
import { EventBridgeHandler } from "aws-lambda";

import { isKeyExtensionAllowed, getExtension } from "../../lib/util";
import { s3, documentClient } from "../../lib/awsClients";

import extractMetaFromKey from "./extractMetaFromKey";
import { exifrExtract } from "./exifrExtract";

const cleanseAndPutIntoArray = (exifData: object = {}) =>
  Reflect.ownKeys(exifData)
    .map((key) => [key, exifData[key]])
    .filter((e) => e.every(Boolean));

export const handler: EventBridgeHandler<
  "Object Created",
  {
    version: string;
    bucket: { name: string };
    object: { key: string; size: number; etag: string; sequencer: string };
    "request-id": string;
    requester: string;
    "source-ip-address": string;
    reason: string;
  },
  void
> = async (event) => {
  info(JSON.stringify(event, null, 2));

  const {
    detail: {
      object: { key, size },
      bucket: { name: bucket },
    },
  } = event;
  info("key:", key, "bucket:", bucket);

  const extension = getExtension(key);
  if (!isKeyExtensionAllowed(extension)) return;

  let exifMeta: object;
  try {
    const buf = (await s3.getObject({ Bucket: bucket, Key: key }).promise())
      .Body;
    exifMeta = cleanseAndPutIntoArray(await exifrExtract(buf));
  } catch (e) {
    error(e);
  }

  const keyMeta = extractMetaFromKey(key);

  if (exifMeta) {
    const meta = {
      id: key,
      attributes: { ...keyMeta, ...exifMeta, size, extension },
    };
    await documentClient
      .put({ Item: meta, TableName: process.env.META_TABLE })
      .promise();
    info("created meta data entry:", JSON.stringify(meta, null, 2));
  }
};
