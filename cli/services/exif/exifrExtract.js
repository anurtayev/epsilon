var exifr = require("exifr");

async function exifrExtract(id) {
  const exifrData = await exifr.parse(id);

  if (exifrData) {
    const {
      Orientation: orientation,
      CreateDate: dateCreated,
      ExifImageWidth: width,
      ExifImageHeight: height,
      latitude,
      longitude,
    } = exifrData;

    return {
      orientation,
      dateCreated: dateCreated && dateCreated.toISOString(),
      width,
      height,
      latitude,
      longitude,
      monthCreated: dateCreated && dateCreated.getMonth() + 1,
      yearCreated: dateCreated && dateCreated.getFullYear(),
    };
  }
}

module.exports = { exifrExtract };
