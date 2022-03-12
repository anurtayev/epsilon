import { MetaData, SearchInput } from "@aspan/sigma";

export type Attributes = MetaData["attributes"];

export type EntryWithAttributes = {
  id: string;
  attributes: Attributes;
};

export type EntriesWithAttributes = Array<EntryWithAttributes>;

export type AttributesSorter = SearchInput["sorter"];

export type SortResult = Array<EntriesWithAttributes>;

export type Entries = Array<string>;

export type TokenSearchResult = { startingIndex: number; newNextToken: string };
