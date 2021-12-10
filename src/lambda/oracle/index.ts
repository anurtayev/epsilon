import schema from "./schema";
import { handlerPath } from "src/lib/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "/oracle",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
