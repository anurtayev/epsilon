const { relative } = require("path");

function extractDateInformationFromFolderName(id) {
  const relativeId = relative(process.env.REPOSITORY_PATH, id);
  const SUBSTRING_ANSI_DATES_BEGIN_WITH = "20";
  const idParts = relativeId.split(".");
  if (
    idParts[0].startsWith(SUBSTRING_ANSI_DATES_BEGIN_WITH) &&
    idParts[0].length === 8
  ) {
    return {
      src: "folderName",
      dateCreated: new Date(
        idParts[0].substring(0, 4),
        idParts[0].substring(4, 6) || 1,
        idParts[0].substring(6) || 1
      ).toISOString(),
      yearCreated: idParts[0].substring(0, 4),
      monthCreated: idParts[0].substring(4, 6) || 1,
    };
  }
}

module.exports = { extractDateInformationFromFolderName };
