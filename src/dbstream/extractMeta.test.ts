import { isEqual } from "lodash";

import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import {
  insertEventWithAttributesOnly,
  insertEventWithAttributesOnlyMeta,
  insertEventWithTagsOnly,
  insertEventWithTagsOnlyMeta,
  insertEventWithTagsAndAttributes,
  insertEventWithTagsAndAttributesMeta,
  modifyEventWithTagsAndAttributes,
  modifyEventWithTagsAndAttributesMeta,
  removeInsertEvent,
  removeInsertEventResult,
} from "../../events/eventStubs";

describe("extractMeta", () => {
  test("should extract attributes and tags from INSERT event", () => {
    const [{ id: id1, attributes: attributes1, tags: tags1 }] = extractMeta(
      insertEventWithTagsAndAttributes as DynamoDBStreamEvent
    );
    const [{ id: id2, attributes: attributes2, tags: tags2 }] =
      insertEventWithTagsAndAttributesMeta;

    expect(id1).toEqual(id2);
    expect(isEqual(new Set(tags1), new Set(tags2))).toEqual(true);
    expect(isEqual(new Set(attributes1), new Set(attributes2))).toEqual(true);
  });

  test("should extract attributes only from INSERT event", () => {
    const [{ id: id1, attributes: attributes1, tags: tags1 }] = extractMeta(
      insertEventWithAttributesOnly as DynamoDBStreamEvent
    );
    const [{ id: id2, attributes: attributes2, tags: tags2 }] =
      insertEventWithAttributesOnlyMeta;

    expect(id1).toEqual(id2);
    expect(tags1).toEqual(tags2);
    expect(tags1).toBeUndefined();
    expect(isEqual(new Set(attributes1), new Set(attributes2))).toEqual(true);
  });

  test("should extract tags only from INSERT event", () => {
    const [{ id: id1, attributes: attributes1, tags: tags1 }] = extractMeta(
      insertEventWithTagsOnly as DynamoDBStreamEvent
    );
    const [{ id: id2, attributes: attributes2, tags: tags2 }] =
      insertEventWithTagsOnlyMeta;

    expect(id1).toEqual(id2);
    expect(attributes1).toEqual(attributes2);
    expect(attributes1).toBeUndefined();
    expect(isEqual(new Set(tags1), new Set(tags2))).toEqual(true);
  });

  test("it should extract attributes correctly from MODIFY event", () => {
    const [
      {
        id: id1,
        attributes: attributes1,
        tags: tags1,
        deletedAttributes: deletedAttributes1,
        deletedTags: deletedTags1,
      },
    ] = extractMeta(modifyEventWithTagsAndAttributes as DynamoDBStreamEvent);
    const [
      {
        id: id2,
        attributes: attributes2,
        tags: tags2,
        deletedAttributes: deletedAttributes2,
        deletedTags: deletedTags2,
      },
    ] = modifyEventWithTagsAndAttributesMeta;

    expect(id1).toEqual(id2);
    expect(isEqual(new Set(tags1), new Set(tags2))).toEqual(true);
    expect(isEqual(new Set(attributes1), new Set(attributes2))).toEqual(true);
    expect(isEqual(new Set(deletedTags1), new Set(deletedTags2))).toEqual(true);
    expect(
      isEqual(new Set(deletedAttributes1), new Set(deletedAttributes2))
    ).toEqual(true);
  });

  test("it should extract attributes correctly from INSERT/REMOVE event", () => {
    const [
      {
        id: id1,
        attributes: attributes1,
        tags: tags1,
        deletedAttributes: deletedAttributes1,
        deletedTags: deletedTags1,
      },
    ] = extractMeta(removeInsertEvent as DynamoDBStreamEvent);
    const [
      {
        id: id2,
        attributes: attributes2,
        tags: tags2,
        deletedAttributes: deletedAttributes2,
        deletedTags: deletedTags2,
      },
    ] = removeInsertEventResult;

    expect(id1).toEqual(id2);
    expect(isEqual(new Set(tags1), new Set(tags2))).toEqual(true);
    expect(isEqual(new Set(attributes1), new Set(attributes2))).toEqual(true);
    expect(isEqual(new Set(deletedTags1), new Set(deletedTags2))).toEqual(true);
    expect(
      isEqual(new Set(deletedAttributes1), new Set(deletedAttributes2))
    ).toEqual(true);
  });
});
