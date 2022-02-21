"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const console_1 = require("console");
const util_1 = require("../../lib/util");
const awsClients_1 = require("../../lib/awsClients");
const handler = async ({ arguments: { id, nextToken, pageSize } }) => {
    (0, console_1.info)({ id, nextToken, pageSize });
    const res = await awsClients_1.s3
        .listObjectsV2({
        Bucket: process.env.MEDIA_BUCKET,
        MaxKeys: awsClients_1.S3_MAX_KEYS,
        Delimiter: "/",
        ...(nextToken ? { ContinuationToken: nextToken } : {}),
        ...(id ? { Prefix: id } : {}),
        ...(pageSize ? { MaxKeys: pageSize } : {}),
    })
        .promise();
    (0, console_1.info)(res);
    return {
        items: [
            ...res.Contents.filter(({ Key: id }) => (0, util_1.isKeyExtensionAllowed)((0, util_1.getExtension)(id))).map(({ Key: id }) => id),
            ...res.CommonPrefixes.map(({ Prefix: id }) => id),
        ],
        nextToken: res.NextContinuationToken,
    };
};
exports.handler = handler;
//# sourceMappingURL=listFolder.js.map