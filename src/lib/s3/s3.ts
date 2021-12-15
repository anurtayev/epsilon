import * as S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  apiVersion: "2006-03-01",
});
