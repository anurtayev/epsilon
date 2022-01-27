import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import * as insertEvent from "./dynamodb-stream-insert-event.json";
// import * as modifyEvent from "../../../docs/dynamodb-stream-modify-event.json";

const expectedAttributes = [
  { name: "orientation", value: "Horizontal (normal)" },
  { name: "dateCreated", value: "2021-10-05T18:27:23.000Z" },
  { name: "width", value: "4032" },
  { name: "height", value: "3024" },
  { name: "latitude", value: "43.81960555555556" },
  { name: "longitude", value: "-79.49740555555556" },
  { name: "monthCreated", value: "10" },
  { name: "yearCreated", value: "2021" },
];

const expectedId = "media/honda1.jpg";

describe("metaKeeper", () => {
  it("should extract attributes correctly from INSERT event", () => {
    const metas = extractMeta(insertEvent as DynamoDBStreamEvent);
    expect(metas[0].attributes).toEqual(expectedAttributes);
    expect(metas[0].id).toEqual(expectedId);
  });
});
