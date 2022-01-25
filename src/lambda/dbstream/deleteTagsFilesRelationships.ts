/**
 * 1. first delete tags-files relationships
 * 2. check if no other files related to deleted tag
 * 3. if not then delete tag
 */
export default ({
  id,
  deletedTags = [],
}: {
  id: string;
  deletedTags: string[];
}): void => {
  console.log(id, deletedTags);
};
