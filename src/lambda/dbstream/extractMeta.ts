import {
  DynamoDBStreamEvent,
  AttributeValue,
  DynamoDBRecord,
} from "aws-lambda";

enum EventName {
  INSERT = "INSERT",
  REMOVE = "REMOVE",
  MODIFY = "MODIFY",
}

type Image = {
  [key: string]: AttributeValue;
};

const findRecord = (
  id: string,
  eventName: EventName,
  records: DynamoDBRecord[]
): Image =>
  records.find(
    ({
      eventName: searchedEventName,
      dynamodb: {
        Keys: {
          id: { S: searchedId },
        },
      },
    }) => searchedId === id && searchedEventName === eventName
  )?.dynamodb[eventName === EventName.INSERT ? "NewImage" : "OldImage"];

export const extractMeta = ({
  Records,
}: DynamoDBStreamEvent): ExtractedMetaArray => {
  const processedId: Array<string> = [];
  const mappedEventRecords: ExtractedMetaArray = [];

  for (const {
    eventName,
    dynamodb: {
      Keys: {
        id: { S: id },
      },
      NewImage,
      OldImage,
    },
  } of Records) {
    switch (eventName) {
      case EventName.INSERT:
        if (!processedId.includes(id)) {
          mappedEventRecords.push(
            reduceMeta(id, NewImage, findRecord(id, EventName.REMOVE, Records))
          );
          processedId.push(id);
        }
        break;
      case EventName.REMOVE:
        if (!processedId.includes(id)) {
          mappedEventRecords.push(
            reduceMeta(id, findRecord(id, EventName.INSERT, Records), OldImage)
          );
          processedId.push(id);
        }
        break;
      case "MODIFY":
        mappedEventRecords.push(reduceMeta(id, NewImage, OldImage));
        break;
      default:
        throw new Error(
          "DynamoDB stream record with undefined eventName detected"
        );
    }
  }

  return mappedEventRecords;
};

const reduceMeta = (id: string, NewImage: Image, OldImage: Image) => ({
  id,
  ...(OldImage
    ? {
        ...(OldImage.tags?.L
          ? {
              deletedTags: calculateDeletedTags(
                OldImage.tags?.L,
                NewImage?.tags?.L
              ),
            }
          : {}),
        ...(OldImage.attributes?.L
          ? {
              deletedAttributes: calculateDeletedAttributes(
                OldImage.attributes?.L,
                NewImage?.attributes?.L
              ),
            }
          : {}),
      }
    : {}),
  ...(NewImage
    ? {
        ...(NewImage.tags?.L ? { tags: extractTags(NewImage.tags.L) } : {}),
        ...(NewImage.attributes?.L
          ? { attributes: extractAttributes(NewImage.attributes?.L) }
          : {}),
      }
    : {}),
});

const calculateDeletedAttributes = (
  oldAttributes: AttributeValue[],
  newAttributes: AttributeValue[] | undefined
): Array<valueObject> =>
  oldAttributes
    .filter(
      ({ L: [{ S: oldName }, oldVO] }) =>
        !newAttributes?.find(
          ({ L: [{ S: newName }, newVO] }) =>
            oldName === newName && (oldVO.S || oldVO.N) === (newVO.S || newVO.N)
        )
    )
    .map(({ L: [{ S: oldName }, oldVO] }) => ({
      name: oldName,
      value: oldVO.S || oldVO.N,
    }));

const calculateDeletedTags = (
  oldTags: AttributeValue[],
  newTags: AttributeValue[] | undefined
): Array<string> =>
  oldTags
    .filter(
      ({ S: oldTag }) => !newTags?.find(({ S: newTag }) => oldTag === newTag)
    )
    .map(({ S: tag }) => tag);

const extractTags = (tags: AttributeValue[]): Array<string> =>
  tags.reduce((prev, { S: tag }) => [...prev, tag], []);

const extractAttributes = (attributes: AttributeValue[]): Array<valueObject> =>
  attributes.reduce(
    (prev, { L: [{ S: name }, valueObject] }) => [
      ...prev,
      { name, value: valueObject.S || valueObject.N },
    ],
    []
  );

type valueObject = { name: string; value: string };

export type ExtractedMetaArray = Array<ExtractedMeta>;

export type ExtractedMeta = {
  id: string;

  tags?: Array<string>;
  deletedTags?: Array<string>;

  attributes?: Array<valueObject>;
  deletedAttributes?: Array<valueObject>;
};
