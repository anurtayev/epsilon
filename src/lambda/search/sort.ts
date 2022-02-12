import { SearchInput, SortOrder } from "../../lib/graphqlTypes";
import {
  EntriesWithAttributes,
  SortResult,
  Entries,
  Attributes,
} from "./types";

export default function (
  entriesWithAttributes: EntriesWithAttributes,
  attributesSorter: SearchInput["attributesSorter"]
): EntriesWithAttributes {
  const sortResult: SortResult = attributesSorter.reduce(
    (innerSortResult, { attribute, sortOrder }) => {
      // sort
      innerSortResult.forEach((currentArray) =>
        sorter(currentArray, attribute, sortOrder)
      );

      // split
      return splitter(innerSortResult, attribute);
    },
    [entriesWithAttributes]
  );

  return sortResult.flat();
}

export const getValue = (attributes: Attributes, attribute: string): string =>
  attributes?.find(([att]) => attribute === att)?.[1];

export const sorter = (
  arr: EntriesWithAttributes,
  attribute: string,
  sortOrder: SortOrder
): EntriesWithAttributes =>
  arr.sort(({ attributes: attributes1 }, { attributes: attributes2 }) => {
    const value1 = getValue(attributes1, attribute);
    const value2 = getValue(attributes2, attribute);

    if (!value1 && !value2) return 0;
    else if (!value1 && value2) return 1;
    else if (value1 && !value2) return -1;
    else if (value1 === value2) return 0;
    else
      return sortOrder === SortOrder.Asc
        ? value1 < value2
          ? -1
          : 1
        : value1 > value2
        ? -1
        : 1;
  });

export const stripper = (
  entriesWithAttributes: EntriesWithAttributes
): Entries => entriesWithAttributes.map(({ id }) => id);

export const splitter = (
  sortResult: SortResult,
  attribute: string
): SortResult =>
  sortResult.reduce((acc, curr) => {
    let currentAccumulator: EntriesWithAttributes = [];
    let groupValue: string = getValue(curr[0].attributes, attribute);

    for (const entryWithAttributes of curr) {
      const currentValue = getValue(entryWithAttributes.attributes, attribute);
      if (currentValue !== groupValue) {
        acc.push(currentAccumulator);
        currentAccumulator = [];
        groupValue = currentValue;
      }
      currentAccumulator.push(entryWithAttributes);
    }

    acc.push(currentAccumulator);

    return acc;
  }, [] as SortResult);
