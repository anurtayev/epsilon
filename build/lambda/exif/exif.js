"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const console_1 = require("console");
const util_1 = require("../../lib/util");
const awsClients_1 = require("../../lib/awsClients");
const extractMetaFromKey_1 = require("./extractMetaFromKey");
const exifrExtract_1 = require("./exifrExtract");
const cleanseAndPutIntoArray = (exifData = {}) => Reflect.ownKeys(exifData)
    .filter((key) => Boolean(exifData[key]))
    .map((key) => [key, String(exifData[key])]);
const handler = async (event) => {
    (0, console_1.info)(JSON.stringify(event, null, 2));
    const { detail: { object: { key, size }, bucket: { name: bucket }, }, } = event;
    const extension = (0, util_1.getExtension)(key);
    (0, console_1.info)("key:", key, "bucket:", bucket);
    if (!(0, util_1.isKeyExtensionAllowed)(extension))
        return;
    let exifMeta;
    try {
        const buf = (await awsClients_1.s3.getObject({ Bucket: bucket, Key: key }).promise())
            .Body;
        exifMeta = await (0, exifrExtract_1.exifrExtract)(buf);
    }
    catch (e) {
        (0, console_1.error)(e);
    }
    const meta = {
        id: key,
        attributes: cleanseAndPutIntoArray({
            ...(0, extractMetaFromKey_1.default)(key),
            ...exifMeta,
            size,
            extension,
        }),
    };
    await awsClients_1.documentClient
        .put({ Item: meta, TableName: process.env.META_TABLE })
        .promise();
    (0, console_1.info)("created meta data entry:", JSON.stringify(meta, null, 2));
};
exports.handler = handler;
//# sourceMappingURL=exif.js.map