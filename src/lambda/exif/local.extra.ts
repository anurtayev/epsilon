import { readFile, writeFile, readdir } from "fs/promises";
import { extname } from "path";
import exifrTransform from "./exifrTransform";
import exifr from "exifr";

async function run() {
  const folder = "tstjpegs";
  const files = await readdir(folder);
  for (const file of files) {
    if (extname(file) === ".json") continue;
    const fileName = folder + "/" + file;
    console.log("==> ", fileName);

    const buf = await readFile(fileName);
    const rawData = await exifr.parse(buf);
    console.log("==> rawData: ", rawData);
    rawData && writeFile(fileName + ".raw.json", JSON.stringify(rawData));

    const data = exifrTransform(rawData);
    console.log("==> data", data);
    data && writeFile(fileName + ".json", JSON.stringify(data));
  }
}

run();
