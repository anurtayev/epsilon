"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = (tags = []) => tags.map((tag) => awsClients_1.documentClient
    .put({ Item: { tag }, TableName: process.env.TAGS_TABLE })
    .promise());
//# sourceMappingURL=putTags.js.map