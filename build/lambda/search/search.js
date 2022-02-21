"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const console_1 = require("console");
const awsClients_1 = require("../../lib/awsClients");
const mergeSearchArrays_1 = require("./mergeSearchArrays");
const findTokenIndex_1 = require("./findTokenIndex");
const sort_1 = require("./sort");
const handler = async ({ arguments: { searchInput: { attributesSorter = [], attributesFilter = [], tagsFilter = [], }, nextToken, pageSize, }, }) => {
    (0, console_1.info)({ attributesSorter, attributesFilter, tagsFilter, nextToken, pageSize });
    let foundEntries;
    for (const [attribute, value] of attributesFilter) {
        const { Items: items } = await awsClients_1.documentClient
            .query({
            TableName: process.env.ATTRIBUTES_FILES_RELATIONSHIPS_TABLE,
            KeyConditionExpression: "attributeValue = :attributeValue",
            ExpressionAttributeValues: {
                ":attributeValue": `${attribute}#${value}`,
            },
            Select: "ALL_ATTRIBUTES",
        })
            .promise();
        foundEntries = (0, mergeSearchArrays_1.default)(items, foundEntries);
    }
    for (const tag of tagsFilter) {
        const { Items: items } = await awsClients_1.documentClient
            .query({
            TableName: process.env.TAGS_FILES_RELATIONSHIPS_TABLE,
            KeyConditionExpression: "tag = :tag",
            ExpressionAttributeValues: {
                ":tag": tag,
            },
            Select: "ALL_ATTRIBUTES",
        })
            .promise();
        foundEntries = (0, mergeSearchArrays_1.default)(items, foundEntries);
    }
    if (!foundEntries)
        return { items: null, nextToken: null };
    const responses = (await Promise.all(foundEntries.map((id) => awsClients_1.documentClient
        .query({
        TableName: process.env.META_TABLE,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        },
        Select: "ALL_ATTRIBUTES",
    })
        .promise()))).map(({ Items: items }) => ({
        id: items[0].id,
        attributes: items[0].attributes,
    }));
    const sortedEntries = (0, sort_1.stripper)((attributesSorter.length && (0, sort_1.default)(responses, attributesSorter)) || responses);
    const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(sortedEntries, pageSize, nextToken);
    return {
        items: sortedEntries.slice(startingIndex, pageSize),
        nextToken: newNextToken,
    };
};
exports.handler = handler;
//# sourceMappingURL=search.js.map