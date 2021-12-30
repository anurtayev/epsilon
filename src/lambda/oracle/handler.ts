import { graphql, buildSchema } from "graphql";
import { readFile } from "fs/promises";
import { join } from "path";
import rootValue from "./root";

// import schema from "./schema";

export const oracle = async (event, context) => {
  console.log({ event, context });

  const fh = await readFile(join(__dirname, "schema.graphql"));
  const schema2 = buildSchema(fh.toString());

  const { data, errors } = await graphql({
    schema: schema2,
    source: "{ hello }",
    rootValue,
  });

  console.log(data, errors);
};
