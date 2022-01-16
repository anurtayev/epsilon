import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import * as sharp from "sharp";
import { strict as assert } from "assert";
import { getObject } from "../../lib/s3";

const bucketName = process.env.MEDIA_BUCKET;
assert(bucketName, "Bucket name environment variable is required");

const getParams = (event: APIGatewayProxyEventV2) => {
  const { queryStringParameters } = event;
  const { width, height, key } = queryStringParameters;
  assert(
    width && height && key,
    "Height and width query string parameters are required"
  );

  return { key, width: Number(width), height: Number(height) };
};

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log({ event, context });

  const { key, width, height } = getParams(event);

  console.log({ key, width, height });

  const { Body: imgBuffer } = await getObject({
    bucket: bucketName,
    key: key,
  });

  return {
    statusCode: 200,
    isBase64Encoded: true,
    body: (
      await sharp(imgBuffer as Buffer)
        .resize(width, height)
        .toBuffer()
    ).toString("base64"),
  };
};
