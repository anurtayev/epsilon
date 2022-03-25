import { DocumentClient } from "aws-sdk/clients/dynamodb";

import mergeSearchArrays from "./mergeSearchArrays";
import { Entries } from "./types";

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
    const currentArray: Entries = [
      { id: "media/heli2.jpg" },
      { id: "media/heli1.jpg" },
    ];
    const resultArray: Entries = mergeSearchArrays(inputArray, currentArray);

    expect(new Set(resultArray)).toEqual(new Set(currentArray));
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
      { id: "media/heli2.jpg" },
      { id: "media/heli1.jpg" },
      { id: "media/heli4.jpg" },
    ];
    const expectedArray: Entries = [
      { id: "media/heli4.jpg" },
      { id: "media/heli2.jpg" },
    ];
    expect(new Set(mergeSearchArrays(inputArray, currentArray))).toEqual(
      new Set(expectedArray)
    );
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
      { id: "media/heli2.jpg" },
      { id: "media/heli1.jpg" },
      { id: "media/heli3.jpg" },
      { id: "media/heli4.jpg" },
    ];
    const expectedArray: Entries = [
      { id: "media/heli4.jpg" },
      { id: "media/heli2.jpg" },
    ];

    expect(new Set(mergeSearchArrays(inputArray, currentArray))).toEqual(
      new Set(expectedArray)
    );
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
    const resultArray: Entries = mergeSearchArrays(inputArray, undefined);

    const expectedArray = [
      { id: "media/heli3.jpg" },
      { id: "media/heli2.jpg" },
      { id: "media/heli4.jpg" },
      { id: "media/heli1.jpg" },
    ];

    expect(new Set(resultArray)).toEqual(new Set(expectedArray));
  });
});
