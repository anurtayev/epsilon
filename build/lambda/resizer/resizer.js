"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const sharp = require("sharp");
const assert_1 = require("assert");
const awsClients_1 = require("../../lib/awsClients");
const bucketName = process.env.MEDIA_BUCKET;
(0, assert_1.strict)(bucketName, "Bucket name environment variable is required");
const getParams = (event) => {
    const { queryStringParameters } = event;
    const { width, height, key } = queryStringParameters;
    (0, assert_1.strict)(width && height && key, "Height and width query string parameters are required");
    return { key, width: Number(width), height: Number(height) };
};
const handler = async (event, context) => {
    console.log({ event, context });
    const { key, width, height } = getParams(event);
    console.log({ key, width, height });
    const { Body: imgBuffer } = await awsClients_1.s3
        .getObject({
        Bucket: bucketName,
        Key: key,
    })
        .promise();
    return {
        statusCode: 200,
        isBase64Encoded: true,
        body: (await sharp(imgBuffer)
            .resize(width, height)
            .toBuffer()).toString("base64"),
    };
};
exports.handler = handler;
//# sourceMappingURL=resizer.js.map