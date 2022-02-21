"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = ({ id, tags = [], }) => tags.map((tag) => awsClients_1.documentClient
    .put({
    Item: { tag, id },
    TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
})
    .promise());
//# sourceMappingURL=putTagsFilesRelationships.js.map