export default ({
  id,
  attributesValues = [],
}: {
  id: string;
  attributesValues: string[];
}): void => {
  console.log(id, attributesValues);
};
