"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = (attributes = []) => attributes.map(({ name: attribute }) => awsClients_1.documentClient
    .put({
    Item: { attribute },
    TableName: process.env.ATTRIBUTES_TABLE,
})
    .promise());
//# sourceMappingURL=putAttributes.js.map