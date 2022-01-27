import { ExtractedMeta } from "./extractMeta";

/**
 * Put all attributesValuesFilesRelationships into
 * AttributesValuesFilesRelationships table if they do not exist.
 */
export default ({
  id,
  attributes,
}: Pick<ExtractedMeta[number], "id" | "attributes">): void => {
  console.log(id, attributes);
};
