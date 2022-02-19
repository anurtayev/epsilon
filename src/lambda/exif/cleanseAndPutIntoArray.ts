import { AttributeValueTerm, InputType } from "../../lib/graphqlTypes";

export default (
  exifData: {
    [key: string]: string | number;
  } = {}
): Array<AttributeValueTerm> => {
  if (Reflect.ownKeys(exifData).length === 0) return;

  return Reflect.ownKeys(exifData)
    .filter((key) => Boolean(exifData[key as string]))
    .map((key) => ({
      attribute: key as string,
      value: String(exifData[key as string]),
      type:
        typeof exifData[key as string] === "string"
          ? InputType.String
          : InputType.Number,
    }));
};
