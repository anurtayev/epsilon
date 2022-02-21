"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsClients_1 = require("../../lib/awsClients");
exports.default = ({ id, deletedAttributes = [], }) => deletedAttributes.map(async ({ name, value }) => {
    const checkResult = await awsClients_1.documentClient
        .query({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        IndexName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE_INDEX,
        KeyConditionExpression: "#a = :attribute",
        ExpressionAttributeValues: {
            ":attribute": name,
        },
        ExpressionAttributeNames: {
            "#a": "attribute",
        },
        Limit: 2,
        Select: "COUNT",
    })
        .promise();
    if (checkResult.Count === 1) {
        await awsClients_1.documentClient
            .delete({
            TableName: process.env.ATTRIBUTES_TABLE,
            Key: {
                attribute: name,
            },
        })
            .promise();
    }
    await awsClients_1.documentClient
        .delete({
        TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
        Key: {
            attributeValue: `${name}#${value}`,
            id,
        },
    })
        .promise();
});
//# sourceMappingURL=processDeletedAttributes.js.map