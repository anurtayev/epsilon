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
    const {
      attribute: { type: type1 },
      value: value1,
    } = valueTerm1;
    const { value: value2 } = valueTerm2;

    if (!valueTerm1 && !valueTerm2) return 0;
    else if (!valueTerm1 && valueTerm2) return 1;
    else if (valueTerm1 && !valueTerm2) return -1;
    else if (value1 === value2) return 0;
    else
      return sortOrder === SortOrder.Asc
        ? (
            type1 === InputType.String
              ? value1 < value2
              : Number(value1) < Number(value2)
          )
          ? -1
          : 1
        : (
            type1 === InputType.String
              ? value1 > value2
              : Number(value1) > Number(value2)
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
