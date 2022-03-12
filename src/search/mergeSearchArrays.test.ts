import { DocumentClient } from "aws-sdk/clients/dynamodb";

import mergeSearchArrays from "../../../src/lambda/search/mergeSearchArrays";
import { Entries } from "../../../src/lambda/search/types";

describe("mergeSearchArrays", () => {
  test("should run correctly when currentArray is a subset of inputArray", () => {
    const inputArray: DocumentClient.ItemList = [
      {
        attribute: "monthCreated",
        id: "media/heli1.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli2.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli3.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli4.jpg",
        attributeValue: "monthCreated#6",
      },
    ];
    const currentArray: Entries = ["media/heli2.jpg", "media/heli1.jpg"];
    const resultArray: Entries = mergeSearchArrays(inputArray, currentArray);

    expect(resultArray).toContain("media/heli2.jpg");
    expect(resultArray).toContain("media/heli1.jpg");
    expect(resultArray.length).toBe(2);
  });

  test("should run correctly when currentArray is a superset of inputArray", () => {
    const inputArray: DocumentClient.ItemList = [
      {
        attribute: "monthCreated",
        id: "media/heli2.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli4.jpg",
        attributeValue: "monthCreated#6",
      },
    ];
    const currentArray: Entries = [
      "media/heli2.jpg",
      "media/heli1.jpg",
      "media/heli4.jpg",
    ];
    const expectedArray: Entries = ["media/heli2.jpg", "media/heli4.jpg"];

    expect(mergeSearchArrays(inputArray, currentArray)).toEqual(expectedArray);
  });

  test("should run correctly when currentArray and inputArray intersect", () => {
    const inputArray: DocumentClient.ItemList = [
      {
        attribute: "monthCreated",
        id: "media/heli2.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli4.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli5.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli6.jpg",
        attributeValue: "monthCreated#6",
      },
    ];
    const currentArray: Entries = [
      "media/heli2.jpg",
      "media/heli1.jpg",
      "media/heli3.jpg",
      "media/heli4.jpg",
    ];
    const expectedArray: Entries = ["media/heli2.jpg", "media/heli4.jpg"];

    expect(mergeSearchArrays(inputArray, currentArray)).toEqual(expectedArray);
  });

  test("should run correctly when currentArray is undefined", () => {
    const inputArray: DocumentClient.ItemList = [
      {
        attribute: "monthCreated",
        id: "media/heli1.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli2.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli3.jpg",
        attributeValue: "monthCreated#6",
      },
      {
        attribute: "monthCreated",
        id: "media/heli4.jpg",
        attributeValue: "monthCreated#6",
      },
    ];
    const expectedArray: Entries = mergeSearchArrays(inputArray, undefined);

    expect(expectedArray).toContain("media/heli3.jpg");
    expect(expectedArray).toContain("media/heli2.jpg");
    expect(expectedArray).toContain("media/heli4.jpg");
    expect(expectedArray).toContain("media/heli1.jpg");
    expect(expectedArray.length).toBe(4);
  });
});
