import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Entry } from "../../lib/graphqlTypes";

export default function (
  inputArray: DocumentClient.ItemList,
  currentArray: Array<Entry> | undefined
): Array<Entry> {
  return currentArray
    ? inputArray
        .filter(({ id: incomingId }) =>
          currentArray.some(({ id: currentId }) => incomingId === currentId)
        )
        .map(({ id }) => ({ id }))
    : inputArray.map(({ id }) => ({ id }));
}
