import { DynamoDBStreamHandler } from "aws-lambda";

import { extractMeta } from "./extractMeta";
import putTags from "./putTags";
import putTagsFilesRelationships from "./putTagsFilesRelationships";
import deleteTagsFilesRelationships from "./deleteTagsFilesRelationships";
import putAttributes from "./putAttributes";
import putAttributesValuesFilesRelationships from "./putAttributesValuesFilesRelationships";
import processDeletedAttributesValues from "./processDeletedAttributesValues";

export const handler: DynamoDBStreamHandler = (event) => {
  console.log(JSON.stringify(event, null, 2));
  const extractedMetaArray = extractMeta(event);

  extractedMetaArray.forEach((extractedMeta) => {
    const {
      id,
      tags,
      deletedTags,
      attributes,
      attributesValues,
      deletedAttributesValues,
    } = extractedMeta;

    tags && putTags(tags);
    tags && putTagsFilesRelationships({ id, tags });
    deletedTags && deleteTagsFilesRelationships({ id, deletedTags });

    attributes && putAttributes(attributes);
    attributes &&
      putAttributesValuesFilesRelationships({ id, attributesValues });
    deletedAttributesValues &&
      processDeletedAttributesValues({ id, deletedAttributesValues });
  });
};
