import { ExtractedMeta } from "./extractMeta";

/**
 * 1. Delete all attributesValuesFilesRelationships.
 * 2. Check every attribute if it related to other files.
 * 3. If it is not, delete it from Attributes table.
 */
export default ({
  id,
  deletedAttributes,
}: Pick<ExtractedMeta[number], "id" | "deletedAttributes">): void => {
  console.log(id, deletedAttributes);
};
