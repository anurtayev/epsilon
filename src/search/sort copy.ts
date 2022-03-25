import {
  AttributeSortTerm,
  SortOrder,
  AttributeValue,
  InputType,
} from "@aspan/sigma";
import {
  EntriesWithAttributes,
  SortResult,
  Entries,
  Attributes,
} from "./types";

export default function (
  entriesWithAttributes: EntriesWithAttributes,
  attributesSorter: Array<AttributeSortTerm>
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

export const getValueTerm = (
  attributes: Attributes,
  attribute: string
): AttributeValue =>
  attributes?.find((valueTerm) => valueTerm.attribute.name === attribute);

export const sorter = (
  arr: EntriesWithAttributes,
  attribute: string,
  sortOrder: SortOrder
): EntriesWithAttributes =>
  arr.sort(({ attributes: attributes1 }, { attributes: attributes2 }) => {
    const valueTerm1 = getValueTerm(attributes1, attribute);
    const valueTerm2 = getValueTerm(attributes2, attribute);

    if (!valueTerm1 && !valueTerm2) return 0;
    else if (!valueTerm1 && valueTerm2) return 1;
    else if (valueTerm1 && !valueTerm2) return -1;
    else if (valueTerm1.value === valueTerm2.value) return 0;
    else if (sortOrder === SortOrder.Asc) {
      return (
        valueTerm1.attribute.type === InputType.String
          ? valueTerm1.value < valueTerm2.value
          : Number(valueTerm1.value) < Number(valueTerm2.value)
      )
        ? -1
        : 1;
    } else
      return (
        valueTerm1.attribute.type === InputType.String
          ? valueTerm1.value > valueTerm2.value
          : Number(valueTerm1.value) > Number(valueTerm2.value)
      )
        ? -1
        : 1;
  });

export const stripper = (
  entriesWithAttributes: EntriesWithAttributes
): Entries => entriesWithAttributes.map(({ id }) => ({ id }));

export const splitter = (
  sortResult: SortResult,
  attribute: string
): SortResult =>
  sortResult.reduce((acc, curr) => {
    let currentAccumulator: EntriesWithAttributes = [];
    let groupValue: AttributeValue = getValueTerm(
      curr[0].attributes,
      attribute
    );

    for (const entryWithAttributes of curr) {
      const currentValue = getValueTerm(
        entryWithAttributes.attributes,
        attribute
      );
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
