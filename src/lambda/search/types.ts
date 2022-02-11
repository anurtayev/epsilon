import {
  MetaData,
  Entry,
  SearchInput,
  FolderConnection,
} from "../../lib/graphqlTypes";

export type Attributes = MetaData["attributes"];

export type EntryWithAttributes = {
  entry: Entry;
  attributes: Attributes;
};

export type EntriesWithAttributes = Array<EntryWithAttributes>;

export type AttributesSorter = SearchInput["attributesSorter"];

export type ArrayOfEntries = FolderConnection["items"];

export type SortResult = Array<EntriesWithAttributes>;

export type Entries = Array<Entry>;
