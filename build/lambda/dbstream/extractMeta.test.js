"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const extractMeta_1 = require("./extractMeta");
const eventStubs_1 = require("./eventStubs");
describe("extractMeta", () => {
    test("should extract attributes and tags from INSERT event", () => {
        const [{ id: id1, attributes: attributes1, tags: tags1 }] = (0, extractMeta_1.extractMeta)(eventStubs_1.insertEventWithTagsAndAttributes);
        const [{ id: id2, attributes: attributes2, tags: tags2 }] = eventStubs_1.insertEventWithTagsAndAttributesMeta;
        expect(id1).toEqual(id2);
        expect((0, lodash_1.isEqual)(new Set(tags1), new Set(tags2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(attributes1), new Set(attributes2))).toEqual(true);
    });
    test("should extract attributes only from INSERT event", () => {
        const [{ id: id1, attributes: attributes1, tags: tags1 }] = (0, extractMeta_1.extractMeta)(eventStubs_1.insertEventWithAttributesOnly);
        const [{ id: id2, attributes: attributes2, tags: tags2 }] = eventStubs_1.insertEventWithAttributesOnlyMeta;
        expect(id1).toEqual(id2);
        expect(tags1).toEqual(tags2);
        expect(tags1).toBeUndefined();
        expect((0, lodash_1.isEqual)(new Set(attributes1), new Set(attributes2))).toEqual(true);
    });
    test("should extract tags only from INSERT event", () => {
        const [{ id: id1, attributes: attributes1, tags: tags1 }] = (0, extractMeta_1.extractMeta)(eventStubs_1.insertEventWithTagsOnly);
        const [{ id: id2, attributes: attributes2, tags: tags2 }] = eventStubs_1.insertEventWithTagsOnlyMeta;
        expect(id1).toEqual(id2);
        expect(attributes1).toEqual(attributes2);
        expect(attributes1).toBeUndefined();
        expect((0, lodash_1.isEqual)(new Set(tags1), new Set(tags2))).toEqual(true);
    });
    test("it should extract attributes correctly from MODIFY event", () => {
        const [{ id: id1, attributes: attributes1, tags: tags1, deletedAttributes: deletedAttributes1, deletedTags: deletedTags1, },] = (0, extractMeta_1.extractMeta)(eventStubs_1.modifyEventWithTagsAndAttributes);
        const [{ id: id2, attributes: attributes2, tags: tags2, deletedAttributes: deletedAttributes2, deletedTags: deletedTags2, },] = eventStubs_1.modifyEventWithTagsAndAttributesMeta;
        expect(id1).toEqual(id2);
        expect((0, lodash_1.isEqual)(new Set(tags1), new Set(tags2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(attributes1), new Set(attributes2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(deletedTags1), new Set(deletedTags2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(deletedAttributes1), new Set(deletedAttributes2))).toEqual(true);
    });
    test("it should extract attributes correctly from INSERT/REMOVE event", () => {
        const [{ id: id1, attributes: attributes1, tags: tags1, deletedAttributes: deletedAttributes1, deletedTags: deletedTags1, },] = (0, extractMeta_1.extractMeta)(eventStubs_1.removeInsertEvent);
        const [{ id: id2, attributes: attributes2, tags: tags2, deletedAttributes: deletedAttributes2, deletedTags: deletedTags2, },] = eventStubs_1.removeInsertEventResult;
        expect(id1).toEqual(id2);
        expect((0, lodash_1.isEqual)(new Set(tags1), new Set(tags2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(attributes1), new Set(attributes2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(deletedTags1), new Set(deletedTags2))).toEqual(true);
        expect((0, lodash_1.isEqual)(new Set(deletedAttributes1), new Set(deletedAttributes2))).toEqual(true);
    });
});
//# sourceMappingURL=extractMeta.test.js.map