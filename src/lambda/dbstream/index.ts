import { DynamoDBStreamHandler } from "aws-lambda";

import { extractMeta } from "./extractMeta";
import putTags from "./putTags";
import putTagsFilesRelationships from "./putTagsFilesRelationships";
import processDeletedTags from "./processDeletedTags";
import putAttributes from "./putAttributes";
import putAttributesFilesRelationships from "./putAttributesFilesRelationships";
import processDeletedAttributes from "./processDeletedAttributes";

export const handler: DynamoDBStreamHandler = (event) => {
  console.log(JSON.stringify(event, null, 2));
  const extractedMetaArray = extractMeta(event);

  extractedMetaArray.forEach((extractedMeta) => {
    const { id, tags, deletedTags, attributes, deletedAttributes } =
      extractedMeta;

    tags && putTags(tags);
    tags && putTagsFilesRelationships({ id, tags });
    deletedTags && processDeletedTags({ id, deletedTags });

    attributes && putAttributes(attributes);
    attributes && putAttributesFilesRelationships({ id, attributes });
    deletedAttributes && processDeletedAttributes({ id, deletedAttributes });
  });
};
