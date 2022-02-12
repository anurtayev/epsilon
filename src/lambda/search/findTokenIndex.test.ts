import findTokenIndex from "./findTokenIndex";
import { Entries, TokenSearchResult } from "./types";

const inputArray: Entries = [
  {
    id: "media/heli1.jpg",
  },
  {
    id: "media/heli2.jpg",
  },
  {
    id: "media/heli3.jpg",
  },
  {
    id: "media/heli4.jpg",
  },
  {
    id: "media/heli47.jpg",
  },
  {
    id: "media/heli48.jpg",
  },
  {
    id: "media/roboto.jpg",
  },
  {
    id: "media/sturgeon.jpg",
  },
];

describe("findTokenIndex", () => {
  test("should return correct value", () => {
    const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
      inputArray,
      4
    );

    expect(startingIndex).toBe(0);
    expect(newNextToken).toBe("media/heli47.jpg");
  });

  test("should return correct value if next token is specified", () => {
    const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
      inputArray,
      3,
      "media/heli3.jpg"
    );

    expect(startingIndex).toBe(2);
    expect(newNextToken).toBe("media/heli48.jpg");
  });

  test("should return undefined next token if page size bigger than inputArray", () => {
    const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
      inputArray,
      300,
      "media/heli3.jpg"
    );

    expect(startingIndex).toBe(2);
    expect(newNextToken).toBeUndefined();
  });

  test("should return correct value if next token does not exist and page size bigger than inputArray", () => {
    const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
      inputArray,
      300,
      "non-existent-token"
    );

    expect(startingIndex).toBe(0);
    expect(newNextToken).toBeUndefined();
  });

  test("should return correct value if next token does not exist", () => {
    const { startingIndex, newNextToken }: TokenSearchResult = findTokenIndex(
      inputArray,
      4,
      "non-existent-token"
    );

    expect(startingIndex).toBe(0);
    expect(newNextToken).toBe("media/heli47.jpg");
  });
});
