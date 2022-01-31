import { isEqual } from "lodash";

import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import {
  insertEvent,
  insertEventResult,
  modifyEvent,
  modifyEventResult,
  removeInsertEvent,
  removeInsertEventResult,
} from "./eventStubs";

describe("extractMeta", () => {
  test("it should extract attributes correctly from INSERT event", () => {
    const [{ id: id1, attributes: attributes1, tags: tags1 }] = extractMeta(
      insertEvent as DynamoDBStreamEvent
    );
    const [{ id: id2, attributes: attributes2, tags: tags2 }] =
      insertEventResult;

    expect(id1).toEqual(id2);
    expect(isEqual(new Set(tags1), new Set(tags2))).toEqual(true);
    expect(isEqual(new Set(attributes1), new Set(attributes2))).toEqual(true);
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
    ] = extractMeta(modifyEvent as DynamoDBStreamEvent);
    const [
      {
        id: id2,
        attributes: attributes2,
        tags: tags2,
        deletedAttributes: deletedAttributes2,
        deletedTags: deletedTags2,
      },
    ] = modifyEventResult;

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
