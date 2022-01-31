import { DynamoDBStreamEvent, AttributeValue } from "aws-lambda";

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
export const extractMeta = (event: DynamoDBStreamEvent): ExtractedMeta =>
  event.Records.reduce(
    (
      prev,
      {
        dynamodb: {
          Keys: {
            id: { S: id },
          },
          NewImage,
          OldImage,
        },
      }
    ) => [
      ...prev,
      {
        id,
        ...(OldImage
          ? {
              deletedTags: calculateDeletedTags(
                OldImage.tags?.L,
                NewImage?.tags?.L
              ),
              deletedAttributes: calculateDeletedAttributes(
                OldImage.attributes?.L,
                NewImage?.attributes?.L
              ),
            }
          : {}),
        ...(NewImage
          ? {
              tags: extractTags(NewImage.tags?.L),
              attributes: extractAttributes(NewImage.attributes?.L),
            }
          : {}),
      },
    ],
    [] as ExtractedMeta
  );

const calculateDeletedAttributes = (
  oldAttributes: AttributeValue[],
  newAttributes: AttributeValue[] | undefined
): Set<valueObject> =>
  new Set(
    oldAttributes
      .filter(
        ({ L: [{ S: oldName }, oldVO] }) =>
          !newAttributes?.find(
            ({ L: [{ S: newName }, newVO] }) =>
              oldName === newName &&
              (oldVO.S || newVO.N) === (newVO.S || newVO.N)
          )
      )
      .map(({ L: [{ S: oldName }, oldVO] }) => ({
        name: oldName,
        value: oldVO.S || oldVO.N,
      }))
  );

const calculateDeletedTags = (
  oldTags: AttributeValue[],
  newTags: AttributeValue[] | undefined
): Set<string> =>
  new Set(
    oldTags
      .filter(
        ({ S: oldTag }) => !newTags?.find(({ S: newTag }) => oldTag === newTag)
      )
      .map(({ S: tag }) => tag)
  );

const extractTags = (tags: AttributeValue[]): Set<string> =>
  new Set<string>(tags.reduce((prev, { S: tag }) => [...prev, tag], []));

const extractAttributes = (attributes: AttributeValue[]): Set<valueObject> =>
  new Set(
    attributes.reduce(
      (prev, { L: [{ S: name }, valueObject] }) => [
        ...prev,
        { name, value: valueObject.S || valueObject.N },
      ],
      []
    )
  );

type valueObject = { name: string; value: string };

export type ExtractedMeta = Array<{
  id: string;

  tags?: Set<string>;
  deletedTags?: Set<string>;

  attributes?: Set<valueObject>;
  deletedAttributes?: Set<valueObject>;
}>;
