import { MetaData, AttributeSortTerm } from "@aspan/sigma";

export type Attributes = MetaData["attributes"];

export type EntryWithAttributes = Pick<MetaData, "id" | "attributes">;

export type EntriesWithAttributes = Array<EntryWithAttributes>;

export type AttributesSorter = Array<AttributeSortTerm>;

export type SortResult = Array<EntriesWithAttributes>;

export type Entries = Array<Pick<MetaData, "id">>;

export type TokenSearchResult = { startingIndex: number; newNextToken: string };
