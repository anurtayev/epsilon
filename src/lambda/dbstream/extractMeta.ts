import { DynamoDBStreamEvent } from "aws-lambda";

/**
 * Processes INSERT, MODIFY and DELETE DynamoDB stream events.
 *
 * Attribute name and value must not contain # symbol. It is used to
 * concatenate and use them as a hash attribute of primary key for
 * attributesValuesFilesRelationships table.
 *
 * DynamoDB tables:
 * - Tags
 * - TagsFilesRelationships
 * - Attributes
 * - AttributesValuesFilesRelationships
 *
 * @param event
 */
export const extractMeta = (event: DynamoDBStreamEvent): ExtractedMeta => {
  const { Records: records } = event;

  const retVal = records.reduce(
    (
      prev,
      {
        dynamodb: {
          Keys: {
            id: { S: id },
          },
          NewImage: {
            attributes: { L: attributes },
          },
        },
      }
    ) => [
      ...prev,
      {
        attributes: attributes.reduce(
          (prev, { L: [{ S: name }, valueObject] }) => [
            ...prev,
            { name, value: valueObject.S || valueObject.N },
          ],
          []
        ),
        id,
      },
    ],
    [] as ExtractedMeta
  );

  return retVal;
};

/**
 *  AttributesFilesRelationships operations:
 *  1. Create new attributeFileRelationship - key Attribute#Value,File
 *  2. Delete deleted attributes for given file - key Attribute#Value,File
 *  3. Check if attribute is related to other files - key Attribute,File
 *  4. Search by attribute/value - key Attribute#Value, File
 */
export type ExtractedMeta = Array<{
  id: string;

  tags?: Array<string>;
  deletedTags?: Array<string>;

  attributes?: Array<{ name: string; value: string }>;
  deletedAttributes?: Array<{ name: string; value: string }>;
}>;
