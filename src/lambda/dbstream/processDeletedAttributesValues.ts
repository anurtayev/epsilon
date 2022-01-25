export default ({
  id,
  deletedAttributesValues = [],
}: {
  id: string;
  deletedAttributesValues: string[];
}): void => {
  console.log(id, deletedAttributesValues);
};
