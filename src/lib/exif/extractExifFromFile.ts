const getExifData = require("util").promisify(require("exif").ExifImage);
const { readFile } = require("fs/promises");

export async function extractExifFromFile(id) {
  const fileBuffer = await readFile(id);

  try {
    const {
      gps,
      image: { Orientation: orientation },
      exif: {
        CreateDate: dateCreatedRaw,
        ExifImageWidth: width,
        ExifImageHeight: height,
      },
    } = await getExifData(fileBuffer);

    const exif = {
      src: "exifexif",
      ...(Reflect.ownKeys(gps).length ? { ...transformGpsData(gps) } : {}),
      ...(orientation ? { orientation } : {}),
      ...(dateCreatedRaw ? { ...transformDate(dateCreatedRaw) } : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    };

    return Reflect.ownKeys(exif).length ? exif : void 0;
  } catch (error) {
    // NOOP
  }
}

function transformDate(dateMilitaryFomat) {
  const p = dateMilitaryFomat
    .split(" ")
    .map((e) => e.split(":"))
    .flat()
    .map(Number);
  return {
    dateCreated: new Date(p[0], p[1] - 1, p[2], p[3], p[4], p[5]).toISOString(),
    yearCreated: p[0],
    monthCreated: p[1],
  };
}

function transformGpsData({
  GPSLatitude: lat,
  GPSLongitude: lon,
  GPSLatitudeRef: latRef,
  GPSLongitudeRef: lonRef,
}) {
  return {
    lat: (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "N" ? 1 : -1),
    lon: (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === "E" ? 1 : -1),
  };
}
