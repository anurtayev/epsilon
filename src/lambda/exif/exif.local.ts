import { error, info } from "console";
import { readFile } from "fs/promises";

import { exifrExtract } from "./exifrExtract";

const filePath = '../../Downloads/heli2.jpg'

export const run = async () => {
  let exif: object;

  try {
    const buf = await readFile(filePath);
    exif = await exifrExtract(buf);
    exif && info("exif source: file");
  } catch (e) {
    error(e);
  }

  info("exif:", exif);
};

run()