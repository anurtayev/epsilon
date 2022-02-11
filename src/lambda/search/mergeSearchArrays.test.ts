import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { isEqual } from "lodash";

import mergeSearchArrays from "./mergeSearchArrays";
import { Entry } from "../../lib/graphqlTypes";

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
    const currentArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli1.jpg",
      },
    ];
    const expectedArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli1.jpg",
      },
    ];

    expect(
      isEqual(
        new Set(mergeSearchArrays(inputArray, currentArray)),
        new Set(expectedArray)
      )
    ).toBe(true);
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
    const currentArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli1.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli4.jpg",
      },
    ];
    const expectedArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli4.jpg",
      },
    ];

    expect(
      isEqual(
        new Set(mergeSearchArrays(inputArray, currentArray)),
        new Set(expectedArray)
      )
    ).toBe(true);
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
    const currentArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli1.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli3.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli4.jpg",
      },
    ];
    const expectedArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli4.jpg",
      },
    ];

    expect(
      isEqual(
        new Set(mergeSearchArrays(inputArray, currentArray)),
        new Set(expectedArray)
      )
    ).toBe(true);
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
    const expectedArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "media/heli3.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli2.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli4.jpg",
      },
      {
        __typename: "Entry",
        id: "media/heli1.jpg",
      },
    ];

    expect(
      isEqual(
        new Set(mergeSearchArrays(inputArray, undefined)),
        new Set(expectedArray)
      )
    ).toBe(true);
  });
});
