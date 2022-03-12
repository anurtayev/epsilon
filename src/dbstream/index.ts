import { DynamoDBStreamHandler } from "aws-lambda";

import { extractMeta } from "./extractMeta";
import putTags from "./putTags";
import putTagsFilesRelationships from "./putTagsFilesRelationships";
import processDeletedTags from "./processDeletedTags";
import putAttributes from "./putAttributes";
import putAttributesFilesRelationships from "./putAttributesFilesRelationships";
import processDeletedAttributes from "./processDeletedAttributes";

export const handler: DynamoDBStreamHandler = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  const extractedMetaArray = extractMeta(event);
  console.log(JSON.stringify(extractedMetaArray, null, 2));

  await Promise.all(
    extractedMetaArray
      .map(({ id, tags, deletedTags, attributes, deletedAttributes }) => [
        putTags(tags),
        putTagsFilesRelationships({ id, tags }),
        processDeletedTags({ id, deletedTags }),

        putAttributes(attributes),
        putAttributesFilesRelationships({ id, attributes }),
        processDeletedAttributes({ id, deletedAttributes }),
      ])
      .flat(2)
  );
};
