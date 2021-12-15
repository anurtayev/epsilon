const { relative } = require("path");
const sharp = require("sharp");

export async function extractDateInformationFromFolderName(id) {
  let meta;

  const relativeId = relative(process.env.REPOSITORY_PATH, id);
  const SUBSTRING_ANSI_DATES_BEGIN_WITH = "20";
  const idParts = relativeId.split(".");
  if (
    idParts[0].startsWith(SUBSTRING_ANSI_DATES_BEGIN_WITH) &&
    idParts[0].length === 8
  ) {
    const dateCreatedBin = new Date(
      idParts[0].substring(0, 4),
      Number(idParts[0].substring(4, 6)) - 1 || 1,
      idParts[0].substring(6) || 1
    );

    meta = {
      dateCreated: dateCreatedBin.toISOString(),
      yearCreated: dateCreatedBin.getFullYear(),
      monthCreated: dateCreatedBin.getMonth() + 1,
    };
  }

  const img = await sharp(id).metadata();
  if (img) {
    meta = {};
    meta.width = img.width;
    meta.height = img.height;
  }

  return meta;
}
