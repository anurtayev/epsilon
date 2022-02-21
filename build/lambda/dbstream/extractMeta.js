"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMeta = void 0;
var EventName;
(function (EventName) {
    EventName["INSERT"] = "INSERT";
    EventName["REMOVE"] = "REMOVE";
    EventName["MODIFY"] = "MODIFY";
})(EventName || (EventName = {}));
const findRecord = (id, eventName, records) => records.find(({ eventName: searchedEventName, dynamodb: { Keys: { id: { S: searchedId }, }, }, }) => searchedId === id && searchedEventName === eventName)?.dynamodb[eventName === EventName.INSERT ? "NewImage" : "OldImage"];
const extractMeta = ({ Records, }) => {
    const processedId = [];
    const mappedEventRecords = [];
    for (const { eventName, dynamodb: { Keys: { id: { S: id }, }, NewImage, OldImage, }, } of Records) {
        switch (eventName) {
            case EventName.INSERT:
                if (!processedId.includes(id)) {
                    mappedEventRecords.push(reduceMeta(id, NewImage, findRecord(id, EventName.REMOVE, Records)));
                    processedId.push(id);
                }
                break;
            case EventName.REMOVE:
                if (!processedId.includes(id)) {
                    mappedEventRecords.push(reduceMeta(id, findRecord(id, EventName.INSERT, Records), OldImage));
                    processedId.push(id);
                }
                break;
            case EventName.MODIFY:
                mappedEventRecords.push(reduceMeta(id, NewImage, OldImage));
                break;
            default:
                throw new Error("DynamoDB stream record with undefined eventName detected");
        }
    }
    return mappedEventRecords;
};
exports.extractMeta = extractMeta;
const reduceMeta = (id, NewImage, OldImage) => ({
    id,
    ...(OldImage
        ? {
            ...(OldImage.tags?.L
                ? {
                    deletedTags: calculateDeletedTags(OldImage.tags?.L, NewImage?.tags?.L),
                }
                : {}),
            ...(OldImage.attributes?.L
                ? {
                    deletedAttributes: calculateDeletedAttributes(OldImage.attributes?.L, NewImage?.attributes?.L),
                }
                : {}),
        }
        : {}),
    ...(NewImage
        ? {
            ...(NewImage.tags?.L ? { tags: extractTags(NewImage.tags.L) } : {}),
            ...(NewImage.attributes?.L
                ? { attributes: extractAttributes(NewImage.attributes?.L) }
                : {}),
        }
        : {}),
});
const calculateDeletedAttributes = (oldAttributes, newAttributes) => oldAttributes
    .filter(({ L: [{ S: oldName }, oldVO] }) => !newAttributes?.find(({ L: [{ S: newName }, newVO] }) => oldName === newName && (oldVO.S || oldVO.N) === (newVO.S || newVO.N)))
    .map(({ L: [{ S: oldName }, oldVO] }) => ({
    name: oldName,
    value: oldVO.S || oldVO.N,
}));
const calculateDeletedTags = (oldTags, newTags) => oldTags
    .filter(({ S: oldTag }) => !newTags?.find(({ S: newTag }) => oldTag === newTag))
    .map(({ S: tag }) => tag);
const extractTags = (tags) => tags.reduce((prev, { S: tag }) => [...prev, tag], []);
const extractAttributes = (attributes) => attributes.reduce((prev, { L: [{ S: name }, valueObject] }) => [
    ...prev,
    { name, value: valueObject.S || valueObject.N },
], []);
//# sourceMappingURL=extractMeta.js.map