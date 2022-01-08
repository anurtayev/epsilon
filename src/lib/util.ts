import { extname } from "path";

export const isKeyExtensionAllowed = (key: string): boolean =>
  process.env.ALLOWED_EXTENSIONS.split("|").includes(
    extname(key).toLowerCase().slice(1)
  );
