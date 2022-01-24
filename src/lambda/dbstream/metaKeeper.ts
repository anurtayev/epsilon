import { DynamoDBStreamEvent } from "aws-lambda";

/**
 * Processes INSERT and MODIFY DynamoDB stream events.
 *
 * Attribute name and value must not contain # symbol. It is used to
 * concatenate and use them as a hash attribute of primary key for
 * attributes table.
 *
 * DynamoDB tables:
 * - Tags
 * - TagsRelations
 * - Attributes
 * - AttributesRelations
 *
 * @param event
 */
export const metaKeeper = (event: DynamoDBStreamEvent) => {
  console.log(event);
};
