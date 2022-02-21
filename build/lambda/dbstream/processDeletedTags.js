"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = ({ id, deletedTags = [], }) => deletedTags.map(async (tag) => {
    const checkResult = await awsClients_1.documentClient
        .query({
        TableName: process.env.TAGS_TABLE,
        KeyConditionExpression: "tag = :tag",
        ExpressionAttributeValues: {
            ":tag": { S: tag },
        },
        Limit: 2,
        Select: "COUNT",
    })
        .promise();
    if (checkResult.Count === 1) {
        await awsClients_1.documentClient
            .delete({
            TableName: process.env.TAGS_TABLE,
            Key: {
                tag,
            },
        })
            .promise();
    }
    await awsClients_1.documentClient
        .delete({
        TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
        Key: {
            tag,
            id,
        },
    })
        .promise();
});
//# sourceMappingURL=processDeletedTags.js.map