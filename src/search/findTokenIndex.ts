import { Entries, TokenSearchResult } from "./types";
import { strict as assert } from "assert";

export default (
  entries: Entries,
  pageSize: number,
  token?: string
): TokenSearchResult => {
  assert(pageSize >= 0, "pageSize must be a number that is greater than zero");
  let newNextToken: string;
  let startingIndex = 0;
  let foundIndex: number;

  if (token) {
    foundIndex = entries.findIndex(({ id }) => id === token);
    startingIndex = foundIndex >= 0 ? foundIndex : 0;
  } else {
    startingIndex = 0;
  }

  if (entries.length > startingIndex + pageSize - 1) {
    newNextToken = entries[startingIndex + pageSize].id;
  }

  return { startingIndex, newNextToken };
};
