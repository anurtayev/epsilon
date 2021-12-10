import S3 from "aws-sdk/clients/s3";

export default new S3({
  params: { Bucket: process.env.MEDIA_S3_BUCKET },
  apiVersion: "2006-03-01",
});
