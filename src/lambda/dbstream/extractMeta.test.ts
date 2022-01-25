import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import * as insertEvent from "./dynamodb-stream-insert-event.json";
// import * as modifyEvent from "../../../docs/dynamodb-stream-modify-event.json";

const expectedAttributes = [
  "orientation",
  "dateCreated",
  "width",
  "height",
  "latitude",
  "longitude",
  "monthCreated",
  "yearCreated",
];

const expectedAttributesValues = [
  "orientation#Horizontal (normal)",
  "dateCreated#2021-10-05T18:27:23.000Z",
  "width#4032",
  "height#3024",
  "latitude#43.81960555555556",
  "longitude#-79.49740555555556",
  "monthCreated#10",
  "yearCreated#2021",
];

const expectedId = "media/honda1.jpg";

describe("metaKeeper", () => {
  it("should extract attributes correctly from INSERT event", () => {
    const metas = extractMeta(insertEvent as DynamoDBStreamEvent);
    expect(metas[0].attributes).toEqual(expectedAttributes);
    expect(metas[0].attributesValues).toEqual(expectedAttributesValues);
    expect(metas[0].id).toEqual(expectedId);
  });
});
