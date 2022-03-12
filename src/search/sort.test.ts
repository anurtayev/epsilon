import sort, {
  splitter,
  getValue,
  sorter,
  stripper,
} from "../../../src/lambda/search/sort";
import {
  EntriesWithAttributes,
  Attributes,
  SortResult,
} from "../../../src/lambda/search/types";
import { SortOrder, AttributeSortTerm } from "../../../src/lib/graphqlTypes";

describe("sort", () => {
  test("should sort correctly", () => {
    const inputArray: EntriesWithAttributes = [
      {
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", ""],
        ],
      },
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", ""],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v1"],
          ["a2", "v23"],
          ["a3", ""],
        ],
      },
      {
        id: "id4",
        attributes: [
          ["a1", "v1"],
          ["a2", "v21"],
          ["a3", ""],
        ],
      },
    ];

    const expectedArray: EntriesWithAttributes = [
      {
        id: "id4",
        attributes: [
          ["a1", "v1"],
          ["a2", "v21"],
          ["a3", ""],
        ],
      },
      {
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", ""],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v1"],
          ["a2", "v23"],
          ["a3", ""],
        ],
      },
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", ""],
        ],
      },
    ];

    const attributesSorter: Array<AttributeSortTerm> = [
      { attribute: "a1", sortOrder: SortOrder.Asc },
      { attribute: "a2", sortOrder: SortOrder.Asc },
    ];

    expect(sort(inputArray, attributesSorter)).toEqual(expectedArray);
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
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        id: "id4",
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];
    const expectedArray_a1: EntriesWithAttributes = [
      {
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        id: "id4",
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];

    const expectedArray_a2: EntriesWithAttributes = [
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        id: "id4",
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
      {
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
    ];

    expect(sorter(inputArray, "a1", SortOrder.Asc)).toEqual(expectedArray_a1);
    expect(sorter(inputArray, "a1", SortOrder.Desc)).toEqual(
      expectedArray_a1.reverse()
    );
    expect(sorter(inputArray, "a2", SortOrder.Asc)).toEqual(expectedArray_a2);
    expect(sorter(inputArray, "a2", SortOrder.Desc)).toEqual(
      expectedArray_a2.reverse()
    );
  });
});

describe("stripper", () => {
  test("should return correct value", () => {
    const inputArray: EntriesWithAttributes = [
      {
        id: "id1",
        attributes: [
          ["a1", "v1"],
          ["a2", "v22"],
          ["a3", "p"],
        ],
      },
      {
        id: "id2",
        attributes: [
          ["a1", "v2"],
          ["a2", "nofig"],
          ["a3", "r"],
        ],
      },
      {
        id: "id3",
        attributes: [
          ["a1", "v3"],
          ["a2", "v23"],
          ["a3", "q"],
        ],
      },
      {
        id: "id4",
        attributes: [
          ["a1", "v4"],
          ["a2", "v21"],
          ["a3", "p"],
        ],
      },
    ];

    expect(stripper(inputArray)).toEqual(["id1", "id2", "id3", "id4"]);
  });
});

describe("splitter", () => {
  test("should return correct value", () => {
    const inputArray: SortResult = [
      [
        {
          id: "id1",
          attributes: [
            ["a1", "v1"],
            ["a2", "v22"],
            ["a3", "p"],
          ],
        },
        {
          id: "id2",
          attributes: [
            ["a1", "v2"],
            ["a2", "nofig"],
            ["a3", "r"],
          ],
        },
        {
          id: "id3",
          attributes: [
            ["a1", "v3"],
            ["a2", "v23"],
            ["a3", "q"],
          ],
        },
        {
          id: "id4",
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
          id: "id1",
          attributes: [
            ["a1", "v1"],
            ["a2", "v22"],
            ["a3", "p"],
          ],
        },
      ],
      [
        {
          id: "id2",
          attributes: [
            ["a1", "v2"],
            ["a2", "nofig"],
            ["a3", "r"],
          ],
        },
      ],
      [
        {
          id: "id3",
          attributes: [
            ["a1", "v3"],
            ["a2", "v23"],
            ["a3", "q"],
          ],
        },
      ],
      [
        {
          id: "id4",
          attributes: [
            ["a1", "v4"],
            ["a2", "v21"],
            ["a3", "p"],
          ],
        },
      ],
    ];

    expect(splitter(inputArray, "a1")).toEqual(expectedArray);
  });
});
