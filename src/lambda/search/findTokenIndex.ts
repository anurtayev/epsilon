import { Entries, TokenSearchResult } from "./types";
import { strict as assert } from "assert";

export default (
  entries: Entries,
  pageSize: number,
  token?: string
): TokenSearchResult => {
  assert(pageSize, "pageSize must be a number that is greater than zero");
  let newNextToken: string;
  const foundIndex = entries.findIndex((id) => id === token);

  const startingIndex = token ? (foundIndex >= 0 ? foundIndex : 0) : 0;

  if (entries.length > startingIndex + pageSize - 1) {
    newNextToken = entries[startingIndex + pageSize];
  }

  return { startingIndex, newNextToken };
};
