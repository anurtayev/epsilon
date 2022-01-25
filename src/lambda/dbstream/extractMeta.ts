import { DynamoDBStreamEvent } from "aws-lambda";

/**
 * Processes INSERT, MODIFY and DELETE DynamoDB stream events.
 *
 * Attribute name and value must not contain # symbol. It is used to
 * concatenate and use them as a hash attribute of primary key for
 * attributes table.
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
          (prev, { L: [{ S: attributeName }] }) => [...prev, attributeName],
          []
        ),
        attributesValues: attributes.reduce(
          (prev, { L: [{ S: attributeName }, valueObject] }) => [
            ...prev,
            `${attributeName}#${valueObject.S || valueObject.N}`,
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

type ExtractedMeta = Array<{
  id: string;

  tags?: Array<string>;
  deletedTags?: Array<string>;

  attributes?: Array<string>;
  attributesValues?: Array<string>;
  deletedAttributesValues?: Array<string>;
}>;
