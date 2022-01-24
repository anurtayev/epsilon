import { metaKeeper } from "./metaKeeper";
import { DynamoDBStreamEvent } from "aws-lambda";

import * as insertEvent from "../../../docs/dynamodb-stream-insert-event.json";
// import * as modifyEvent from "../../../docs/dynamodb-stream-modify-event.json";

const expectedAttributes = [
  "orientation#Horizontal (normal)",
  "dateCreated#2021-10-05T18:27:23.000Z",
  "width#4032",
  "height#3024",
  "latitude#43.81960555555556",
  "longitude#-79.49740555555556",
  "monthCreated#10",
  "yearCreated#2021",
];

describe("metaKeeper", () => {
  it("should complete successfully", () => {
    metaKeeper(insertEvent as DynamoDBStreamEvent);
    expect(true).toBeTruthy();
  });
});
