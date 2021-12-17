import * as payload from "./s3-event.json";

import { handler } from "./exif";

handler(payload);
