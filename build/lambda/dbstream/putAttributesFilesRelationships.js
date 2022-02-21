"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = ({ id, attributes = [], }) => attributes.map(({ name: attribute, value }) => awsClients_1.documentClient
    .put({
    Item: { attribute, id, attributeValue: `${attribute}#${value}` },
    TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
})
    .promise());
//# sourceMappingURL=putAttributesFilesRelationships.js.map