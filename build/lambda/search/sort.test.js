"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("./sort");
const graphqlTypes_1 = require("../../lib/graphqlTypes");
describe("sort", () => {
    test("should sort correctly", () => {
        const inputArray = [
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
        const expectedArray = [
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
        const attributesSorter = [
            { attribute: "a1", sortOrder: graphqlTypes_1.SortOrder.Asc },
            { attribute: "a2", sortOrder: graphqlTypes_1.SortOrder.Asc },
        ];
        expect((0, sort_1.default)(inputArray, attributesSorter)).toEqual(expectedArray);
    });
});
describe("getValue", () => {
    test("should return correct value", () => {
        const attributes = [
            ["a1", "v1"],
            ["a2", "v2"],
            ["a3", "v3"],
            ["a4", "v4"],
        ];
        expect((0, sort_1.getValue)(attributes, "a1")).toEqual("v1");
        expect((0, sort_1.getValue)(attributes, "a4")).toEqual("v4");
        expect((0, sort_1.getValue)(attributes, null)).toBeUndefined();
        expect((0, sort_1.getValue)(null, "v10")).toBeUndefined();
        expect((0, sort_1.getValue)(null, undefined)).toBeUndefined();
        expect((0, sort_1.getValue)(undefined, undefined)).toBeUndefined();
    });
});
describe("sorter", () => {
    test("should sort correctly", () => {
        const inputArray = [
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
        const expectedArray_a1 = [
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
        const expectedArray_a2 = [
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
        expect((0, sort_1.sorter)(inputArray, "a1", graphqlTypes_1.SortOrder.Asc)).toEqual(expectedArray_a1);
        expect((0, sort_1.sorter)(inputArray, "a1", graphqlTypes_1.SortOrder.Desc)).toEqual(expectedArray_a1.reverse());
        expect((0, sort_1.sorter)(inputArray, "a2", graphqlTypes_1.SortOrder.Asc)).toEqual(expectedArray_a2);
        expect((0, sort_1.sorter)(inputArray, "a2", graphqlTypes_1.SortOrder.Desc)).toEqual(expectedArray_a2.reverse());
    });
});
describe("stripper", () => {
    test("should return correct value", () => {
        const inputArray = [
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
        expect((0, sort_1.stripper)(inputArray)).toEqual(["id1", "id2", "id3", "id4"]);
    });
});
describe("splitter", () => {
    test("should return correct value", () => {
        const inputArray = [
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
        const expectedArray = [
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
        expect((0, sort_1.splitter)(inputArray, "a1")).toEqual(expectedArray);
    });
});
//# sourceMappingURL=sort.test.js.map