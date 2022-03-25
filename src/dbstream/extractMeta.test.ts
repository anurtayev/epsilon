import { extractMeta } from "./extractMeta";
import { DynamoDBStreamEvent } from "aws-lambda";

import dynamodb_update_0001 from "./dynamodb_update_0001.json";
import dynamodb_update_0001_test_data from "./dynamodb_update_0001_test_data.json";
import dynamodb_update_0002 from "./dynamodb_update_0002.json";
import dynamodb_update_0002_test_data from "./dynamodb_update_0002_test_data.json";

describe("extractMeta", () => {
  test("should extract attributes and tags from INSERT event 0001", () => {
    const resultData = extractMeta(dynamodb_update_0001 as DynamoDBStreamEvent);
    const expectedData = dynamodb_update_0001_test_data;

    expect(resultData).toEqual(expectedData);
  });

  test("should extract attributes and tags from INSERT event 0002", () => {
    console.log(dynamodb_update_0002);

    const resultData = extractMeta(dynamodb_update_0002 as DynamoDBStreamEvent);
    const expectedData = dynamodb_update_0002_test_data;

    expect(resultData).toEqual(expectedData);
  });
});
