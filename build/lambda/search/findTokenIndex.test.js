"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findTokenIndex_1 = require("./findTokenIndex");
const inputArray = [
    "media/heli1.jpg",
    "media/heli2.jpg",
    "media/heli3.jpg",
    "media/heli4.jpg",
    "media/heli47.jpg",
    "media/heli48.jpg",
    "media/roboto.jpg",
    "media/sturgeon.jpg",
];
describe("findTokenIndex", () => {
    test("should return correct value", () => {
        const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(inputArray, 4);
        expect(startingIndex).toBe(0);
        expect(newNextToken).toBe("media/heli47.jpg");
    });
    test("should return correct value if next token is specified", () => {
        const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(inputArray, 3, "media/heli3.jpg");
        expect(startingIndex).toBe(2);
        expect(newNextToken).toBe("media/heli48.jpg");
    });
    test("should return undefined next token if page size bigger than inputArray", () => {
        const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(inputArray, 300, "media/heli3.jpg");
        expect(startingIndex).toBe(2);
        expect(newNextToken).toBeUndefined();
    });
    test("should return correct value if next token does not exist and page size bigger than inputArray", () => {
        const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(inputArray, 300, "non-existent-token");
        expect(startingIndex).toBe(0);
        expect(newNextToken).toBeUndefined();
    });
    test("should return correct value if next token does not exist", () => {
        const { startingIndex, newNextToken } = (0, findTokenIndex_1.default)(inputArray, 4, "non-existent-token");
        expect(startingIndex).toBe(0);
        expect(newNextToken).toBe("media/heli47.jpg");
    });
});
//# sourceMappingURL=findTokenIndex.test.js.map