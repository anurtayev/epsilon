import { ExtractedMeta } from "./extractMeta";

/**
 * 1. Delete all tagsFilesRelationships
 * 2. Check every tag if it is related to other files
 * 3. If it is related then delete tag
 */
export default ({
  id,
  deletedTags,
}: Pick<ExtractedMeta[number], "id" | "deletedTags">): void => {
  console.log(id, deletedTags);
};
