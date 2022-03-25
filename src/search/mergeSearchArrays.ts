import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Entries } from "./types";

export default function (
  inputArray: DocumentClient.ItemList,
  currentArray: Entries | undefined
): Entries {
  return currentArray
    ? inputArray
        .filter(({ id: incomingId }: { id: string }) =>
          currentArray.some(({ id }) => incomingId === id)
        )
        .map(({ id }) => ({ id }))
    : inputArray.map(({ id }) => ({ id }));
}
