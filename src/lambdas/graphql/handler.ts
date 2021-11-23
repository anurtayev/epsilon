import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { graphql, buildSchema } from "graphql";
import { readFile } from "fs/promises";
import { join } from "path";
import rootValue from "./root";

import schema from "./schema";

const oracle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const fh = await readFile(join(__dirname, "schema.graphql"));
  const schema2 = buildSchema(fh.toString());

  const { data, errors } = await graphql({
    schema: schema2,
    source: "{ hello }",
    rootValue,
  });

  return formatJSONResponse({
    message: data || errors,
    event,
  });
};

export const main = middyfy(oracle);
