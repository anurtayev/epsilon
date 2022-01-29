import * as S3 from "aws-sdk/clients/s3";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const s3 = new S3({
  apiVersion: "2006-03-01",
});

export const S3_MAX_KEYS = 100;

export const documentClient = new DocumentClient({ apiVersion: "2012-08-10" });
