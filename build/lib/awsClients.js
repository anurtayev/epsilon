"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = exports.S3_MAX_KEYS = exports.s3 = void 0;
const S3 = require("aws-sdk/clients/s3");
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
exports.s3 = new S3({
    apiVersion: "2006-03-01",
});
exports.S3_MAX_KEYS = 100;
exports.documentClient = new dynamodb_1.DocumentClient({ apiVersion: "2012-08-10" });
//# sourceMappingURL=awsClients.js.map