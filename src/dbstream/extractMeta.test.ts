import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import dynamodb_update_0003 from "./dynamodb_update_0003.json";
import dynamodb_update_0003_test_data from "./dynamodb_update_0003_test_data.json";

describe("extractMeta", () => {
  test("should extract attributes and tags from INSERT event 0003", () => {
    const resultData = extractMeta(dynamodb_update_0003 as DynamoDBStreamEvent);
    const expectedData = dynamodb_update_0003_test_data;

    expect(resultData).toEqual(expectedData);
  });
});
