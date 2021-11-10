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
      src: "exifr",
      orientation,
      dateCreated,
      width,
      height,
      latitude,
      longitude,
    };
  }
}

module.exports = { exifrExtract };
