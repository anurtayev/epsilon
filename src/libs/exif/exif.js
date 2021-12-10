const {
  extractDateInformationFromFolderName,
} = require("./dateFromFolderName");
const { exifrExtract } = require("./exifrExtract");

async function extractExif(id) {
  let exif;

  exif = await exifrExtract(id);

  if (!exif) {
    exif = await extractDateInformationFromFolderName(id);
  }

  return exif;
}

module.exports = {
  extractExif,
};
