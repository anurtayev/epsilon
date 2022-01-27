import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const documentClient = new DocumentClient({ apiVersion: "2012-08-10" });
