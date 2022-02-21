"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const extractMeta_1 = require("./extractMeta");
const putTags_1 = require("./putTags");
const putTagsFilesRelationships_1 = require("./putTagsFilesRelationships");
const processDeletedTags_1 = require("./processDeletedTags");
const putAttributes_1 = require("./putAttributes");
const putAttributesFilesRelationships_1 = require("./putAttributesFilesRelationships");
const processDeletedAttributes_1 = require("./processDeletedAttributes");
const handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    const extractedMetaArray = (0, extractMeta_1.extractMeta)(event);
    console.log(JSON.stringify(extractedMetaArray, null, 2));
    await Promise.all(extractedMetaArray
        .map(({ id, tags, deletedTags, attributes, deletedAttributes }) => [
        (0, putTags_1.default)(tags),
        (0, putTagsFilesRelationships_1.default)({ id, tags }),
        (0, processDeletedTags_1.default)({ id, deletedTags }),
        (0, putAttributes_1.default)(attributes),
        (0, putAttributesFilesRelationships_1.default)({ id, attributes }),
        (0, processDeletedAttributes_1.default)({ id, deletedAttributes }),
    ])
        .flat(2));
};
exports.handler = handler;
//# sourceMappingURL=index.js.map