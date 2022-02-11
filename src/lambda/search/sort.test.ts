import { isEqual } from "lodash";

import sort, { splitter, getValue, sorter, stripper } from "./sort";
import { EntriesWithAttributes, Attributes, SortResult } from "./types";
import { Entry, SearchInput, SortOrder } from "../../lib/graphqlTypes";

describe("sort", () => {
  test("should sort property", () => {
    const inputArray: EntriesWithAttributes = [
      {
        entry: {
          __typename: "Entry",
          id: "id1",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", ""],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id2",
        },
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", ""],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id3",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v23"],
          ["a3", ""],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id4",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v21"],
          ["a3", ""],
        ],
      },
    ];
    const expectedArray: Array<Entry> = [
      {
        __typename: "Entry",
        id: "id4",
      },
      {
        __typename: "Entry",
        id: "id1",
      },
      {
        __typename: "Entry",
        id: "id3",
      },
      {
        __typename: "Entry",
        id: "id2",
      },
    ];

    const attributesSorter: SearchInput["attributesSorter"] = [
      { attribute: "a1", sortOrder: SortOrder.Asc },
      { attribute: "a2", sortOrder: SortOrder.Asc },
    ];

    expect(isEqual(sort(inputArray, attributesSorter), expectedArray)).toBe(
      true
    );
  });
});

describe("getValue", () => {
  test("should return correct value", () => {
    const attributes: Attributes = [
      ["a1", "v1"],
      ["a2", "v2"],
      ["a3", "v3"],
      ["a4", "v4"],
    ];

    expect(getValue(attributes, "a1")).toEqual("v1");
    expect(getValue(attributes, "a4")).toEqual("v4");
    expect(getValue(attributes, null)).toBeUndefined();
    expect(getValue(null, "v10")).toBeUndefined();
    expect(getValue(null, undefined)).toBeUndefined();
    expect(getValue(undefined, undefined)).toBeUndefined();
  });
});

describe("sorter", () => {
  test("should sort correctly", () => {
    const inputArray: EntriesWithAttributes = [
      {
        entry: {
          __typename: "Entry",
          id: "id1",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id2",
        },
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id3",
        },
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id4",
        },
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];
    const expectedArray_a1: EntriesWithAttributes = [
      {
        entry: {
          __typename: "Entry",
          id: "id1",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id2",
        },
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id3",
        },
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id4",
        },
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];

    const expectedArray_a2: EntriesWithAttributes = [
      {
        entry: {
          __typename: "Entry",
          id: "id2",
        },
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id4",
        },
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id1",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id3",
        },
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
    ];

    expect(
      isEqual(sorter(inputArray, "a1", SortOrder.Asc), expectedArray_a1)
    ).toBe(true);
    expect(
      isEqual(
        sorter(inputArray, "a1", SortOrder.Desc),
        expectedArray_a1.reverse()
      )
    ).toBe(true);
    expect(
      isEqual(sorter(inputArray, "a2", SortOrder.Asc), expectedArray_a2)
    ).toBe(true);
    expect(
      isEqual(
        sorter(inputArray, "a2", SortOrder.Desc),
        expectedArray_a2.reverse()
      )
    ).toBe(true);
  });
});

describe("stripper", () => {
  test("should return correct value", () => {
    const inputArray: EntriesWithAttributes = [
      {
        entry: {
          __typename: "Entry",
          id: "id1",
        },
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id2",
        },
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id3",
        },
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        entry: {
          __typename: "Entry",
          id: "id4",
        },
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];

    expect(
      isEqual(stripper(inputArray), [
        {
          __typename: "Entry",
          id: "id1",
        },
        {
          __typename: "Entry",
          id: "id2",
        },
        {
          __typename: "Entry",
          id: "id3",
        },
        {
          __typename: "Entry",
          id: "id4",
        },
      ])
    ).toBe(true);
  });
});

describe("splitter", () => {
  test("should return correct value", () => {
    const inputArray: SortResult = [
      [
        {
          entry: {
            __typename: "Entry",
            id: "id1",
          },
          attributes: [
            ["a1", "v1"],
            ["a2", "v22"],
            ["a3", "p"],
          ],
        },
        {
          entry: {
            __typename: "Entry",
            id: "id2",
          },
          attributes: [
            ["a1", "v2"],
            ["a2", "nofig"],
            ["a3", "r"],
          ],
        },
        {
          entry: {
            __typename: "Entry",
            id: "id3",
          },
          attributes: [
            ["a1", "v3"],
            ["a2", "v23"],
            ["a3", "q"],
          ],
        },
        {
          entry: {
            __typename: "Entry",
            id: "id4",
          },
          attributes: [
            ["a1", "v4"],
            ["a2", "v21"],
            ["a3", "p"],
          ],
        },
      ],
    ];

    const expectedArray: SortResult = [
      [
        {
          entry: {
            __typename: "Entry",
            id: "id1",
          },
          attributes: [
            ["a1", "v1"],
            ["a2", "v22"],
            ["a3", "p"],
          ],
        },
      ],
      [
        {
          entry: {
            __typename: "Entry",
            id: "id2",
          },
          attributes: [
            ["a1", "v2"],
            ["a2", "nofig"],
            ["a3", "r"],
          ],
        },
      ],
      [
        {
          entry: {
            __typename: "Entry",
            id: "id3",
          },
          attributes: [
            ["a1", "v3"],
            ["a2", "v23"],
            ["a3", "q"],
          ],
        },
      ],
      [
        {
          entry: {
            __typename: "Entry",
            id: "id4",
          },
          attributes: [
            ["a1", "v4"],
            ["a2", "v21"],
            ["a3", "p"],
          ],
        },
      ],
    ];

    expect(isEqual(splitter(inputArray, "a1"), expectedArray)).toBe(true);
  });
});
