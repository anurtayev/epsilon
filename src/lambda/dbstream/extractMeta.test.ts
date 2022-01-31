import { isEqual } from "lodash";

import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import {
  insertEvent,
  insertEventResult,
  modifyEvent,
  modifyEventResult,
} from "./eventStubs";

describe("extractMeta", () => {
  test("it should extract attributes correctly from INSERT event", () => {
    const meta = extractMeta(insertEvent as DynamoDBStreamEvent);
    expect(isEqual(meta, insertEventResult)).toEqual(true);
  });

  test("it should extract attributes correctly from MODIFY event", () => {
    const meta = extractMeta(modifyEvent as DynamoDBStreamEvent);
    expect(isEqual(meta, modifyEventResult)).toEqual(true);
  });
});
