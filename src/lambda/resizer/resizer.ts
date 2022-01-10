import { AppSyncResolverHandler } from "aws-lambda";
import sharp from "sharp";
import assert from "assert";

const bucketName = process.env.INPUT_S3_BUCKET;
assert(bucketName, "Bucket name environment variable is required");

const getParams = (event) => {
  const { rawPath, queryStringParameters } = event;
  assert(
    queryStringParameters,
    "Height and width query string parameters are required"
  );
  const imageKey = rawPath.slice(9);
  const { width, height } = queryStringParameters;
  assert(
    width && height,
    "Height and width query string parameters are required"
  );

  return { imageKey, width: Number(width), height: Number(height) };
};

export const handler = async (event, context) => {
  console.log({ event, context });

  const { imageKey, width, height } = getParams(event);

  console.log({ imageKey, width, height });

  const { Body: imgBuffer } = await S3.getObject({
    Bucket: bucketName,
    Key: imageKey,
  }).promise();

  return {
    statusCode: 200,
    isBase64Encoded: true,
    body: (await sharp(imgBuffer).resize(width, height).toBuffer()).toString(
      "base64"
    ),
  };
};
