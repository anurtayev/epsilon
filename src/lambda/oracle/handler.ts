import type { ValidatedEventAPIGatewayProxyEvent } from "src/lib/apiGateway";
import { formatJSONResponse } from "src/lib/apiGateway";
import { middyfy } from "src/lib/lambda";
import { graphql, buildSchema } from "graphql";
import { readFile } from "fs/promises";
import { join } from "path";
import rootValue from "./root";

import schema from "./schema";

const oracle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
  context
) => {
  console.log({ event, context });

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
    context,
  });
};

export const main = middyfy(oracle);
