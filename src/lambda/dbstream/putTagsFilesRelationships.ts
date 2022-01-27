import { ExtractedMeta } from "./extractMeta";

/**
 * Put all tagsFilesRelationships inot TagsFilesRelationships table
 * if they do not exist.
 */
export default ({
  id,
  tags,
}: Pick<ExtractedMeta[number], "id" | "tags">): void => {
  console.log(id, tags);
};
