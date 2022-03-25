import { SortOrder, AttributeSortTerm, InputType } from "@aspan/sigma";
import sort, { splitter, getValueTerm, sorter, stripper } from "./sort";
import { EntriesWithAttributes, Attributes, SortResult } from "./types";

describe("sort", () => {
  test("should sort correctly", () => {
    const inputArray: EntriesWithAttributes = [
      {
        id: "id1",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v22" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id2",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v2" },
          { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id3",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v23" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id4",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v21" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
    ];

    const expectedArray: EntriesWithAttributes = [
      {
        id: "id4",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v21" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id1",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v22" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id3",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v23" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
      {
        id: "id2",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v2" },
          { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
          { attribute: { name: "a3", type: InputType.String }, value: "" },
        ],
      },
    ];

    const attributesSorter: Array<AttributeSortTerm> = [
      { attribute: "a1", sortOrder: SortOrder.Asc },
      { attribute: "a2", sortOrder: SortOrder.Asc },
    ];

    const result = sort(inputArray, attributesSorter);
    expect(new Set(result)).toEqual(new Set(expectedArray));
  });
});

describe("getValueTerm", () => {
  test("should return correct value", () => {
    const attributes: Attributes = [
      { attribute: { name: "a1", type: InputType.String }, value: "v1" },
      { attribute: { name: "a2", type: InputType.String }, value: "v2" },
      { attribute: { name: "a3", type: InputType.String }, value: "v3" },
      { attribute: { name: "a4", type: InputType.String }, value: "v4" },
    ];

    expect(getValueTerm(attributes, "a1")).toEqual({
      attribute: { name: "a1", type: InputType.String },
      value: "v1",
    });
    expect(getValueTerm(attributes, "a4")).toEqual({
      attribute: { name: "a4", type: InputType.String },
      value: "v4",
    });
    expect(getValueTerm(attributes, null)).toBeUndefined();
    expect(getValueTerm(null, "v10")).toBeUndefined();
    expect(getValueTerm(null, undefined)).toBeUndefined();
    expect(getValueTerm(undefined, undefined)).toBeUndefined();
  });
});

describe("sorter STRING", () => {
  const inputArray: EntriesWithAttributes = [
    {
      id: "id1",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v1" },
        { attribute: { name: "a2", type: InputType.String }, value: "v22" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
    {
      id: "id2",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v2" },
        { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
        { attribute: { name: "a3", type: InputType.String }, value: "r" },
      ],
    },
    {
      id: "id3",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v3" },
        { attribute: { name: "a2", type: InputType.String }, value: "v23" },
        { attribute: { name: "a3", type: InputType.String }, value: "q" },
      ],
    },
    {
      id: "id4",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v4" },
        { attribute: { name: "a2", type: InputType.String }, value: "v21" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
  ];

  const expectedArray_a1: EntriesWithAttributes = [
    {
      id: "id1",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v1" },
        { attribute: { name: "a2", type: InputType.String }, value: "v22" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
    {
      id: "id2",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v2" },
        { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
        { attribute: { name: "a3", type: InputType.String }, value: "r" },
      ],
    },
    {
      id: "id3",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v3" },
        { attribute: { name: "a2", type: InputType.String }, value: "v23" },
        { attribute: { name: "a3", type: InputType.String }, value: "q" },
      ],
    },
    {
      id: "id4",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v4" },
        { attribute: { name: "a2", type: InputType.String }, value: "v21" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
  ];

  const expectedArray_a2: EntriesWithAttributes = [
    {
      id: "id2",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v2" },
        { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
        { attribute: { name: "a3", type: InputType.String }, value: "r" },
      ],
    },
    {
      id: "id4",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v4" },
        { attribute: { name: "a2", type: InputType.String }, value: "v21" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
    {
      id: "id1",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v1" },
        { attribute: { name: "a2", type: InputType.String }, value: "v22" },
        { attribute: { name: "a3", type: InputType.String }, value: "p" },
      ],
    },
    {
      id: "id3",
      attributes: [
        { attribute: { name: "a1", type: InputType.String }, value: "v3" },
        { attribute: { name: "a2", type: InputType.String }, value: "v23" },
        { attribute: { name: "a3", type: InputType.String }, value: "q" },
      ],
    },
  ];

  test("should sort correctly ASC 1", () => {
    const result1 = sorter(inputArray, "a1", SortOrder.Asc);
    expect(result1).toEqual(expectedArray_a1);
  });

  test("should sort correctly ASC 2", () => {
    const result = sorter(inputArray, "a2", SortOrder.Asc);
    expect(result).toEqual(expectedArray_a2);
  });

  test("should sort correctly DESC 1", () => {
    const result2 = sorter(inputArray, "a1", SortOrder.Desc);
    expect(result2).toEqual(expectedArray_a1.reverse());
  });

  test("should sort correctly DESC 2", () => {
    const result = sorter(inputArray, "a2", SortOrder.Desc);
    expect(result).toEqual(expectedArray_a2.reverse());
  });
});

describe("stripper", () => {
  test("should return correct value", () => {
    const inputArray: EntriesWithAttributes = [
      {
        id: "id1",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v1" },
          { attribute: { name: "a2", type: InputType.String }, value: "v22" },
          { attribute: { name: "a3", type: InputType.String }, value: "p" },
        ],
      },
      {
        id: "id2",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v2" },
          { attribute: { name: "a2", type: InputType.String }, value: "nofig" },
          { attribute: { name: "a3", type: InputType.String }, value: "r" },
        ],
      },
      {
        id: "id3",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v3" },
          { attribute: { name: "a2", type: InputType.String }, value: "v23" },
          { attribute: { name: "a3", type: InputType.String }, value: "q" },
        ],
      },
      {
        id: "id4",
        attributes: [
          { attribute: { name: "a1", type: InputType.String }, value: "v4" },
          { attribute: { name: "a2", type: InputType.String }, value: "v21" },
          { attribute: { name: "a3", type: InputType.String }, value: "p" },
        ],
      },
    ];

    expect(stripper(inputArray)).toEqual([
      { id: "id1" },
      { id: "id2" },
      { id: "id3" },
      { id: "id4" },
    ]);
  });
});

describe("splitter", () => {
  test("should return correct value", () => {
    const inputArray: SortResult = [
      [
        {
          id: "id1",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v1" },
            { attribute: { name: "a2", type: InputType.String }, value: "v22" },
            { attribute: { name: "a3", type: InputType.String }, value: "p" },
          ],
        },
        {
          id: "id2",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v2" },
            {
              attribute: { name: "a2", type: InputType.String },
              value: "nofig",
            },
            { attribute: { name: "a3", type: InputType.String }, value: "r" },
          ],
        },
        {
          id: "id3",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v3" },
            { attribute: { name: "a2", type: InputType.String }, value: "v23" },
            { attribute: { name: "a3", type: InputType.String }, value: "q" },
          ],
        },
        {
          id: "id4",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v4" },
            { attribute: { name: "a2", type: InputType.String }, value: "v21" },
            { attribute: { name: "a3", type: InputType.String }, value: "p" },
          ],
        },
      ],
    ];

    const expectedArray: SortResult = [
      [
        {
          id: "id1",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v1" },
            { attribute: { name: "a2", type: InputType.String }, value: "v22" },
            { attribute: { name: "a3", type: InputType.String }, value: "p" },
          ],
        },
      ],
      [
        {
          id: "id2",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v2" },
            {
              attribute: { name: "a2", type: InputType.String },
              value: "nofig",
            },
            { attribute: { name: "a3", type: InputType.String }, value: "r" },
          ],
        },
      ],
      [
        {
          id: "id3",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v3" },
            { attribute: { name: "a2", type: InputType.String }, value: "v23" },
            { attribute: { name: "a3", type: InputType.String }, value: "q" },
          ],
        },
      ],
      [
        {
          id: "id4",
          attributes: [
            { attribute: { name: "a1", type: InputType.String }, value: "v4" },
            { attribute: { name: "a2", type: InputType.String }, value: "v21" },
            { attribute: { name: "a3", type: InputType.String }, value: "p" },
          ],
        },
      ],
    ];

    expect(splitter(inputArray, "a1")).toEqual(expectedArray);
  });
});
